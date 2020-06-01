// This function request Open AQ to extract closest stations around each user selected location

let template = require('../data/closeStations');
const axios = require('axios')

const OpenAQ_ENDPOINT = "https://api.openaq.org/v1";

module.exports = async function getClosestStations(data, stationNumber) {

    console.log("Requesting Open AQ for closest stations...")
    template.count = data.length
    const promises = data.map(async station => {
        await getStations(station.properties.name, station.geometry.coordinates[1], station.geometry.coordinates[0], stationNumber,station.weatherInfo)
    })

    const changedData = await Promise.all(promises);
    console.log("Closest stations are successfully extracted")
    return template
}

async function getStations(stationName, latitude, longitude, count, weatherInfo) {
    await axios.get(OpenAQ_ENDPOINT + "/locations?coordinates=" + latitude + "," + longitude + "&radius=10000000&order_by=distance&limit=" + count + "&parameter=pm25").then(response => {

        let closestStations = response.data.results.map(closeStation => {
            return {
                "country": closeStation.country,
                "city": closeStation.city,
                "name": closeStation.location,
                "coordinates": [
                    closeStation.coordinates.longitude,
                    closeStation.coordinates.latitude
                ],
                "firstUpdated": closeStation.firstUpdated,
                "lastUpdated": closeStation.lastUpdated,
                "distance": closeStation.distance
            }
        })

        template.targetStations.push({
            "name": stationName,
            "properties": {
                "coordinates": [
                    longitude,
                    latitude
                ]
            },
            "weatherInfo": weatherInfo,
            "closeStations": closestStations
        })

    }).catch(function (error) {
        console.log(error.message);
    });
}
