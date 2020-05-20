// This function will calculate the initial observation for each user selected location

module.exports = function idwInitialCalculator(data) {

    console.log("calculating initial observation for each location using IDW technique...")
    const addedInitialObs = data.targetStations.map(station => {
        let totalDis = 0;
        let totalImpact = 0;
        station.closeStations.map(closeStation => {
            if (closeStation) {
                totalDis += closeStation.distance
                totalImpact += (closeStation.averageObservation * closeStation.distance)
                return null
            }
        })
        return {...station,"initialObservation": totalImpact/totalDis}
    })
    return {...data, 'targetStations':addedInitialObs}
}
