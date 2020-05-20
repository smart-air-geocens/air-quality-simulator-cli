// This function will receive a json file including initial value for the pm25 observation
// It returns an updated json file based on using random walk technique

module.exports = function randomWalk(inputJSON,walkingStep) {

    let outputJSON = {...inputJSON}
    const updatedPm25 = inputJSON.targetStations.map( station => {
        if(station.pm25Latest){
            const pm25Value = randomWalkUpdator(station.pm25Latest,walkingStep)
            return {...station, 'pm25Latest':pm25Value}
        }else{
            const pm25Value = randomWalkUpdator(station.initialObservation,walkingStep)
            return {...station, 'pm25Latest':pm25Value}
        }

    })
    return {...inputJSON,"targetStations":updatedPm25}

}

function randomWalkUpdator(latestValue,walkingStep) {
    let min = 0;
    let max = 500;

    if(Math.random() >= 0.5)
        latestValue += walkingStep;
    else
        latestValue -= walkingStep;

    if(latestValue > max )
        latestValue = max;
    if(latestValue < min)
        latestValue = min;

    return latestValue;
}
