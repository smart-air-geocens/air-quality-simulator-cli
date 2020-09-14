// This function gets a json file including observations and adds an average value to represent all the observations
// Have been already extracted

module.exports = async function averageValue(data) {

    let addedAverage = await Promise.all(data.targetStations.map(async station => {

        let closeStationChanged = await Promise.all(Object.keys(station.closeStations).map(async key => {

            let closeStationPerOP = await Promise.all(station.closeStations[key].map(closeStation => {
                if (closeStation.Observations && closeStation.Observations.length > 0) {
                    let sum = 0;
                    closeStation.Observations.forEach(observation => {
                        sum += observation.value
                        // return null;
                    })
                    return {...closeStation, "averageObservation": sum / closeStation.Observations.length}
                }else
                    return {...closeStation, "averageObservation": "NA"}

            }))
            station.closeStations[key] = closeStationPerOP

        }))
    }))

    return data

}


