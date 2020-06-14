// This function will calculate the initial observation for each user selected location

module.exports = async function idwInitialCalculator(data) {

    console.log("calculating initial observation for each location using IDW technique...")

    const addedInitialObs = await Promise.all(data.targetStations.map(async station => {

        let initialArray = await Promise.all(Object.keys(station.closeStations).map( key => {
            const memberName = "initialObservation_" + key;
            let totalDis = 0;
            let totalImpact = 0;
            let unitOfMeasurement = "NA"
            station.closeStations[key].forEach(closeStation => {
                if (closeStation) {
                    totalDis += closeStation.distance
                    totalImpact += (closeStation.averageObservation * closeStation.distance)
                    unitOfMeasurement = closeStation.Observations[0].uofm
                    return null
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


    // const addedInitialObs = data.targetStations.map(station => {
    //     let totalDis = 0;
    //     let totalImpact = 0;
    //     station.closeStations.map(closeStation => {
    //         if (closeStation) {
    //             totalDis += closeStation.distance
    //             totalImpact += (closeStation.averageObservation * closeStation.distance)
    //             return null
    //         }
    //     })
    //     return {...station,"initialObservation": totalImpact/totalDis}
    // })
    // return {...data, 'targetStations':addedInitialObs}
}
