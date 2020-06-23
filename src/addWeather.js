// In this function, weather information will be added to each station
// We used OpenWeatherMap API to provide latest weather information like, temperature, wind speed, wind direction, humidity, and pressure

const axios = require('axios')
const OpenWeatherMapAPI_Key = "801552ed0524ac33aa8e06cd8dc5dbe2";
const OpenWeatherMap_ENDPOINT = "http://api.openweathermap.org/data/2.5/weather?";

module.exports = async function addWeather(inputData) {

    const changedData = await Promise.all(inputData.map(async station => {
        const weatherObservations = await getWeatherInfo(station);
        let data = {...station ,"weatherInfo": weatherObservations}

        return data
    }))

    return changedData;

}

async function getWeatherInfo(station) {

    const date = new Date();
    const response = await axios.get(OpenWeatherMap_ENDPOINT + "lat=" + station.geometry.coordinates[1] + "&lon=" + station.geometry.coordinates[0] + "&appid=" + OpenWeatherMapAPI_Key + "&units=metric");
    if(response) {
        return {
            "temp": response.data.main.temp,
            "pressure": response.data.main.pressure,
            "humidity": response.data.main.humidity,
            "wind": {
                "speed": response.data.wind.speed,
                "direction": response.data.wind.deg
            },
            "phenomenonTime": date.toISOString()
        }

    }
}
