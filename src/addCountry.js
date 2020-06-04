const axios = require('axios')
const MapQuest_Key = "Fmjtd|luubn96t2q,ag=o5-9070hz";
const MapQuest_ENDPOINT = "http://open.mapquestapi.com/geocoding/v1";

module.exports = async function addCountry(inputData) {

    const promises = inputData.features.map(async station => {
        const country = await getCountry(station.geometry.coordinates[1],station.geometry.coordinates[0])
        station.properties = {
            "name":station.properties.name,
            "pm25":null,
            "country": country
        }
        return station;
    })

    const changedData = await Promise.all(promises);
    return changedData;

}

async function getCountry(latitude,longitude) {
    let country;
    await axios.get(MapQuest_ENDPOINT + "/reverse?key=" + MapQuest_Key +"&location=" + latitude + "," + longitude).then(response => {
        country = response.data.results[0].locations[0].adminArea1
    }).catch(function(error) {
        console.log('Error on Authentication');
    });

    return country;
}
