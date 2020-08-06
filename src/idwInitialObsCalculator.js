// This function will calculate the initial observation for each user selected location

module.exports = async function idwInitialCalculator(data) {

    console.log("calculating initial observation for each location using IDW interpolation technique...")

    const addedInitialObs = await Promise.all(data.targetStations.map(async station => {

        let initialArray = await Promise.all(Object.keys(station.closeStations).map( key => {
            let totalDis = 0;
            let totalImpact = 0;
            let unitOfMeasurement = "NA"
            station.closeStations[key].forEach(closeStation => {
                if(closeStation.averageObservation !== "NA"){
                    if (closeStation) {
                        totalDis += closeStation.distance
                        totalImpact += (closeStation.averageObservation * closeStation.distance)
                        if(closeStation.Observations) unitOfMeasurement = closeStation.Observations[0].uofm
                        return null
                    }
                }
            })

            let returnedObject = {}

            returnedObject["name"] = key

            if(totalImpact/totalDis)
                returnedObject["value"] = totalImpact/totalDis
            else
                returnedObject["value"] = 0

            returnedObject["UofM"] = unitOfMeasurement

            return returnedObject

        }))
        return {...station, InitialObsevations: initialArray}
    }))
    return {...data, 'targetStations': addedInitialObs}

}
