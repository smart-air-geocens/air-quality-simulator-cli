const krigingTrain = require("../src/krigingTrain");
const krigingPredict = require("../src/krigingPredict");

let model;
const sigma2 = 0, alpha = 100;

module.exports =  async function krigingPreparation(data,vgModel) {

    console.log("calculating initial observation for each location using Kriging interpolation technique...")

    model = vgModel

    const addedInitialObs = await Promise.all(data.targetStations.map(async station => {

        let initialArray = await Promise.all(Object.keys(station.closeStations).map( async key => {

            let x = [];
            let y = [];
            let z = [];
            let predictedValue = null;

            let unitOfMeasurement = "NA"

            station.closeStations[key].forEach(closeStation => {
                if(closeStation.averageObservation !== "NA"){
                    if (closeStation) {
                        x.push(closeStation.coordinates[0])
                        y.push(closeStation.coordinates[1])
                        z.push(closeStation.averageObservation)
                        if(closeStation.Observations) unitOfMeasurement = closeStation.Observations[0].uofm
                        return null
                    }
                }
            })

            // Kriging interpolation technique needs at least 2 stations around the target station
            if(x.length > 2){
                let variogram = await krigingTrain(z, x, y, model, sigma2, alpha);
                predictedValue = await krigingPredict(station.properties.coordinates[0], station.properties.coordinates[1], variogram)
            }

            let returnedObject = {}

            returnedObject["name"] = key

            if(predictedValue)
                returnedObject["value"] = predictedValue
            else
                returnedObject["value"] = 0

            returnedObject["UofM"] = unitOfMeasurement

            return returnedObject

        }))
        return {...station, InitialObsevations: initialArray}
    }))
    return {...data, 'targetStations': addedInitialObs}
}
