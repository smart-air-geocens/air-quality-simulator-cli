// This function will receive a json file including initial value for the pm25 observation
// It returns an updated json file based on using random walk technique

module.exports = function randomWalk(inputJSON,walkingStepPM25,walkingStepTemperature,walkingStepPressure,walkingStepHumidity,walkingStepWindSpeed,walkingStepWindDirection) {

    let outputJSON = {...inputJSON}
    const updatedPm25 = inputJSON.targetStations.map( station => {

        station = updateWeather(station,walkingStepTemperature,walkingStepPressure,walkingStepHumidity,walkingStepWindSpeed,walkingStepWindDirection);

        if(station.pm25Latest){
            const pm25Value = randomWalkUpdator(station.pm25Latest,walkingStepPM25)
            return {...station, 'pm25Latest':pm25Value}
        }else{
            const pm25Value = randomWalkUpdator(station.initialObservation,walkingStepPM25)
            return {...station, 'pm25Latest':pm25Value}
        }

    })
    return {...inputJSON,"targetStations":updatedPm25}

}

function updateWeather(station,walkingStepTemperature,walkingStepPressure,walkingStepHumidity,walkingStepWindSpeed,walkingStepWindDirection) {
    const updatedTemperature = randomWalkUpdatorTemperature(station.weatherInfo.temp,walkingStepTemperature);
    const updatedPressure = randomWalkUpdatorPressure(station.weatherInfo.pressure,walkingStepPressure);
    const updatedHumidity = randomWalkUpdatorHumidity(station.weatherInfo.humidity,walkingStepHumidity);
    const updatedWindSpeed = randomWalkUpdatorWindSpeed(station.weatherInfo.wind.speed,walkingStepWindSpeed);
    const updatedWindDirection = randomWalkUpdatorWindDirection(station.weatherInfo.wind.direction,walkingStepWindDirection);
    station.weatherInfo.temp = updatedTemperature;
    station.weatherInfo.pressure = updatedPressure;
    station.weatherInfo.humidity = updatedHumidity;
    station.weatherInfo.wind.speed = updatedWindSpeed;
    station.weatherInfo.wind.direction = updatedWindDirection;

    return station;
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

function randomWalkUpdatorTemperature(latestValue,walkingStep) {
    let min = -35;
    let max = 35;

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

function randomWalkUpdatorPressure(latestValue,walkingStep) {
    // retrived from: https://sciencing.com/temperature-affect-barometric-pressure-5013070.html
    let min = 1013.25;
    let max = 1084;

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

function randomWalkUpdatorHumidity(latestValue,walkingStep) {
    let min = 0;
    let max = 100;

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

function randomWalkUpdatorWindSpeed(latestValue,walkingStep) {
    // Retrieved from: https://en.wikipedia.org/wiki/Wind_speed
    let min = 0;
    let max = 113.3;

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

function randomWalkUpdatorWindDirection(latestValue,walkingStep) {
    let min = 0;
    let max = 360;

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
