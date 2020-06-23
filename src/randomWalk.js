// This function will receive a json file including initial value for the pm25 observation
// It returns an updated json file based on using random walk technique

module.exports = function randomWalk(inputJSON,requiredOPs,walkingStepTemperature,walkingStepPressure,walkingStepHumidity,walkingStepWindSpeed,walkingStepWindDirection) {


    const updatedObservations =  inputJSON.targetStations.map(   station => {

        station =  updateWeather(station,walkingStepTemperature,walkingStepPressure,walkingStepHumidity,walkingStepWindSpeed,walkingStepWindDirection);

        randomWalkUpdatorAirQuality(station,requiredOPs)

        return null

        // return {...station, 'InitialObsevations':updatedAirQualityObservations}

    })

    return inputJSON
    // return {...inputJSON,"targetStations":updatedObservations}

}

function randomWalkUpdatorAirQuality(station,requiredOPs) {


     Object.keys(requiredOPs).map(key => {

        if(requiredOPs[key].required){

            switch (key) {
                case 'pm25':
                    station.InitialObsevations.forEach(OP => {
                        if(OP.name === "pm25")
                            OP.value = randomWalkUpdator(OP.value, requiredOPs[key].walking,0,500)
                    })
                    break
                case 'pm10':
                    station.InitialObsevations.forEach(OP => {
                        if(OP.name === "pm10")
                            OP.value = randomWalkUpdator(OP.value, requiredOPs[key].walking, 0, 500)
                    })
                    break
                case 'so2':
                    station.InitialObsevations.forEach(OP => {
                        if(OP.name === "so2")
                            OP.value = randomWalkUpdator(OP.value, requiredOPs[key].walking, 0, 2)
                    })
                    break
                case 'no2':
                    station.InitialObsevations.forEach(OP => {
                        if(OP.name === "no2")
                            OP.value = randomWalkUpdator(OP.value, requiredOPs[key].walking, 0, 4.76)
                    })
                    break
                case 'o3':
                    station.InitialObsevations.forEach(OP => {
                        if(OP.name === "o3")
                            OP.value = randomWalkUpdator(OP.value, requiredOPs[key].walking, 0, 0.4)
                    })
                    break
                default:
                    station.InitialObsevations.forEach(OP => {
                        if(OP.name === "co")
                            OP.value = randomWalkUpdator(OP.value, requiredOPs[key].walking, 0, 10.4)
                    })
                    break
            }

        }
    })

}

function updateWeather(station,walkingStepTemperature,walkingStepPressure,walkingStepHumidity,walkingStepWindSpeed,walkingStepWindDirection) {
    const updatedTemperature = randomWalkUpdator(station.weatherInfo.temp,walkingStepTemperature,-35, 35);
    const updatedPressure = randomWalkUpdator(station.weatherInfo.pressure,walkingStepPressure,1013.25,1084);
    const updatedHumidity = randomWalkUpdator(station.weatherInfo.humidity,walkingStepHumidity, 0 , 100);
    const updatedWindSpeed = randomWalkUpdator(station.weatherInfo.wind.speed,walkingStepWindSpeed, 0 , 113.3);
    const updatedWindDirection = randomWalkUpdator(station.weatherInfo.wind.direction,walkingStepWindDirection,0,360);
    station.weatherInfo.temp = updatedTemperature;
    station.weatherInfo.pressure = updatedPressure;
    station.weatherInfo.humidity = updatedHumidity;
    station.weatherInfo.wind.speed = updatedWindSpeed;
    station.weatherInfo.wind.direction = updatedWindDirection;

    return station;
}

function randomWalkUpdator(latestValue, walkingStep,lowest,highest) {
    let min = lowest;
    let max = highest;

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

