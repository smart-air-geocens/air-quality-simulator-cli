// This function request Open AQ to extract closest stations around each user selected location

let template = require('../data/closeStations');
const axios = require('axios')

const OpenAQ_ENDPOINT = "https://api.openaq.org/v1";

module.exports = async function getClosestStations(data, stationNumber, requireObservedProperties) {

    console.log("Requesting Open AQ for closest stations...")
    template.count = data.length

    let targetStationUpdated = await Promise.all(data.map(async station => {
        return {
            "name": station.properties.name,
            "properties": {
                "coordinates": [
                    station.geometry.coordinates[0],
                    station.geometry.coordinates[1]
                ]
            },
            "weatherInfo": station.weatherInfo,
            "closeStations":{}
        }
    }))
    template.targetStations = targetStationUpdated;

   await Promise.all( Object.keys(requireObservedProperties).map( async (key) => {

       if (requireObservedProperties[key].required) {
           await Promise.all(template.targetStations.map(async station => {
               await getStations(station.name, station.properties.coordinates[1], station.properties.coordinates[0], stationNumber, key)
           }))
       }

   }))

    return template
}

async function getStations(stationName, latitude, longitude, count, key) {
    const response = await axios.get(OpenAQ_ENDPOINT + "/locations?coordinates=" + latitude + "," + longitude + "&radius=10000000&order_by=distance&limit=" + count + "&parameter=" + key);
    if(response){

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

        template.targetStations.map((station,index) => {
            if (station.name === stationName) {
                template.targetStations[index].closeStations[key] = closestStations
            }
        })

    }else {
        console.log("Response failed")
    }
}
