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
        const test = await Promise.all(station.closeStations.map(async (closeStation) => {
            let observations = await stationsObservations(closeStation, fromDateTime, toDateTime, observationLimit)
            let data = {...closeStation, "Observations": observations}

            return data
        }))

        return {...station, "closeStations": test}
    }))
    addedData = {...json, "targetStations": promises}
    console.log("Observations are successfully extracted")
    return addedData

}

async function stationsObservations(station, from, to, limit) {
    let observations;
    let res = await axios.get(OpenAQ_ENDPOINT + "/measurements?country=" + station.country + "&city=" + station.city + "&location=" + station.name +
        "&parameter=pm25&date_from=" + from + "&date_to=" + to + "&limit=" + limit)

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
