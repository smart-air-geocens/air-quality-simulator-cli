// This method is going to add latest observations to the closest stations

const axios = require('axios')
const moment = require('moment');
const toDateTime = moment().toISOString();

let dateArray = [];

const OpenAQ_ENDPOINT = "https://api.openaq.org/v1";

module.exports = async function latestObservations(json, monthNumber, observationLimit) {

    console.log("Requesting Open AQ for observations...")

    const fromDateTime = moment().subtract(monthNumber, 'month').toISOString()

    const promises = await Promise.all(json.targetStations.map(async (station) => {

        const stationsData = await Promise.all(Object.keys(station.closeStations).map(async observedPropertyKey => {

            const addedObservation2Station = await Promise.all(station.closeStations[observedPropertyKey].map(async closeStation => {

                let observations = await stationsObservations(closeStation, fromDateTime, toDateTime, observationLimit, observedPropertyKey)

                let data = {...closeStation, "Observations": observations}

                return data
            }))


            station.closeStations[observedPropertyKey] = addedObservation2Station


            return null

        }))

        return null
        //
    }))
    // const addedData = {...json, "targetStations": promises}
    //
    console.log("Observations are successfully extracted")
    //
    return json
}

async function stationsObservations(station, from, to, limit, observedProperty) {
    let observations;
    let res = await axios.get(OpenAQ_ENDPOINT + "/measurements?country=" + station.country + "&city=" + station.city + "&location=" + station.name +
        "&parameter=" + observedProperty + "&date_from=" + from + "&date_to=" + to + "&limit=" + limit)

    if (res.data.results.length > 0) {
        observations = res.data.results.map(observation => {
            return {
                "datastrreamName": observation.parameter,
                "phenomenonTime": observation.date.utc,
                "value": observation.value,
                "uofm": observation.unit
            }
        })
    }

    return observations

}
