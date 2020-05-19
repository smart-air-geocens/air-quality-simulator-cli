// This function gets a json file including observations and adds an average value to represent all the observations
// Have been already extracted

module.exports = async function averageValue(data){
    let addedAverage = await Promise.all(data.targetStations.map(async station => {

        let closeStationsChanged = await Promise.all(station.closeStations.map(closeStation => {
            if(closeStation.Observations && closeStation.Observations.length > 0 ){
                let sum = 0;
                closeStation.Observations.map(observation => {
                    sum += observation.value
                    // return null;
                })

                return {...closeStation,"averageObservation":sum / closeStation.Observations.length}
            }

        }))
        return {...station,'closeStations': closeStationsChanged}
    }))
    console.log("finish Average")
    return {...data, 'targetStations': addedAverage}

}
