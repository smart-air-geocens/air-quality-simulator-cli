#!/usr/bin/env node

const randomWalk = require('../src/randomWalk')
const jsonUpdator = require('../src/jsonUpdator')
const uploadToSTA = require('../src/uploadToSTA')
const prompt = require('prompt-sync')();
const yargs = require("yargs");
const getClosestStations = require('../src/getClosestStations')
const writeJSON = require('../src/writeJson')
const requestObservations = require('../src/latestObservations')
const averageObservations = require('../src/averageValue')
const idwInitialObsCalculator = require('../src/idwInitialObsCalculator')
require('dotenv').config()
const inputData = require("../data/data");
const addCountry = require("../src/addCountry");
const addWeather = require("../src/addWeather")


let addedCountryData;

const options = yargs
    .usage("Usage: -n <name>")
    // .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .option("n", {
        alias: "stationNumber",
        describe: "The number of close stations you want to consider close to each location",
        type: "number",
        default: 10
    })
    // .option("m", {
    //     alias: "monthNumber",
    //     describe: "The number of months ago you want to consider to extract observations",
    //     type: "number",
    //     default: 1
    // })
    // .option("o", {
    //     alias: "observationCount",
    //     describe: "The number of observations you want consider within the date range",
    //     type: "number",
    //     default: 20
    // })
    .option("pm25", {alias: "PM25Observation", describe: "Do you like adding PM2.5 as an observation?", type: "boolean", default: true})
    .option("pm10", {alias: "PM10Observation", describe: "Do you like adding PM10 as an observation?", type: "boolean", default: true})
    .option("so2", {alias: "SO2Observation", describe: "Do you like adding SO2 as an observation?", type: "boolean", default: true})
    .option("no2", {alias: "NO2Observation", describe: "Do you like adding NO2 as an observation?", type: "boolean", default: true})
    .option("o3", {alias: "O3Observation", describe: "Do you like adding O3 as an observation?", type: "boolean", default: true})
    .option("co", {alias: "COObservation", describe: "Do you like adding CO as an observation?", type: "boolean", default: false})

    .option("wpm25", {alias: "walkingStepPM25", describe: "The value of walking step to estimate PM2.5", type: "number", default: 1})
    .option("wpm10", {alias: "walkingStepPM10", describe: "The value of walking step to estimate PM10", type: "number", default: 1})
    .option("wso2", {alias: "walkingStepSO2", describe: "The value of walking step to estimate SO2", type: "number", default: 1})
    .option("wno2", {alias: "walkingStepNO2", describe: "The value of walking step to estimate NO2", type: "number", default: 1})
    .option("wo3", {alias: "walkingStepO3", describe: "The value of walking step to estimate O3", type: "number", default: 1})
    .option("wco", {alias: "walkingStepCO", describe: "The value of walking step to estimate CO", type: "number", default: 1})


    .option("wt", {alias: "walkingStepTemperature", describe: "The value of walking step to estimate temperature", type: "number", default: 1})
    .option("wp", {alias: "walkingStepPressure", describe: "The value of walking step to estimate pressure", type: "number", default: 1})
    .option("wh", {alias: "walkingStepHumidity", describe: "The value of walking step to estimate humidity", type: "number", default: 1})
    .option("wws", {alias: "walkingStepWindSpeed", describe: "The value of walking step to estimate wind speed", type: "number", default: 1})
    .option("wwd", {alias: "walkingStepWindDirection", describe: "The value of walking step to estimate wind direction", type: "number", default: 1})
    .option("t", {alias: "timeInterval", describe: "time interval based on millisecond", type: "number", default: 10000})
    .argv;

// // Prompt user to input required information in console.
// console.log("Please input required information in command line.");
//
// process.env.STA_ENDPOINT = prompt('STA-Endpoint: ')
// while (!process.env.STA_ENDPOINT){
//     nullInfo("STA-Endpoint")
//     process.env.STA_ENDPOINT = prompt('STA-Endpoint: ');
// }
//
// process.env.USER_NAME = prompt('Username: ');
// while (!process.env.USER_NAME){
//     nullInfo("username")
//     process.env.USER_NAME = prompt('Username: ');
// }
//
// process.env.PASSWORD = prompt('Password: ',{echo: '*'})
// while (!process.env.PASSWORD){
//     nullInfo("password")
//     process.env.PASSWORD = prompt('Password: ');
// }
//
// function nullInfo(varName) {
//     console.log(varName + " is required and cannot be null");
// }

(async () => {
    addedCountryData = await addCountry(inputData);
    const addedWeather = await addWeather(addedCountryData)

    const requiredObservedProperties = {
        pm25 : {
            required: options.PM25Observation,
            walking: options.walkingStepPM25
        },
        pm10 : {
            required: options.PM10Observation,
            walking: options.walkingStepPM10
        },
        so2 : {
            required: options.SO2Observation,
            walking: options.walkingStepSO2
        },
        no2 : {
            required: options.NO2Observation,
            walking: options.walkingStepNO2
        },
        o3 : {
            required: options.O3Observation,
            walking: options.walkingStepO3
        },
        co : {
            required: options.COObservation,
            walking: options.walkingStepCO
        },
    }

    const closestStations = await getClosestStations(addedWeather, options.stationNumber,requiredObservedProperties)
    // writeJSON(closestStations, 'initial')

    // // const addedObservations = await requestObservations(closestStations, options.monthNumber, options.observationCount)
    // // const addedObservations = await requestObservations(closestStations, 1, 6000)


    const addedObservations = await requestObservations(closestStations, 1, 2)
    writeJSON(addedObservations, 'initial')



    //
    // const averageObsAdded = await averageObservations(addedObservations)
    //
    // let initialObsAdded = idwInitialObsCalculator(averageObsAdded)
    // writeJSON(initialObsAdded, 'initial')
    //
    // setInterval(function () {
    //
    //     initialObsAdded = randomWalk(initialObsAdded,
    //         options.walkingStepPM25,
    //         options.walkingStepTemperature,
    //         options.walkingStepPressure,
    //         options.walkingStepHumidity,
    //         options.walkingStepWindSpeed,
    //         options.walkingStepWindDirection)
    //
    //
    //     if (initialObsAdded.targetStations[0].pm25Latest) {
    //
    //         const pushData = initialObsAdded.targetStations.map(async station => {
    //             const parameter = {
    //                 "ThingName": station.name,
    //                 "ThingDescription": "The " + station.name + " is a synthetic station to report air quality and weather conditions",
    //                 "location": station.properties.coordinates,
    //                 "pm25": station.pm25Latest,
    //                 "temperature" : station.weatherInfo.temp,
    //                 "pressure" : station.weatherInfo.pressure,
    //                 "humidity" : station.weatherInfo.humidity,
    //                 "windSpeed" : station.weatherInfo.wind.speed,
    //                 "windDirection" : station.weatherInfo.wind.direction
    //
    //             }
    //             const updatedJson = await jsonUpdator(parameter)
    //             // uploadToSTA(updatedJson)
    //             return null
    //         })
    //
    //     }
    //
    // }, options.timeInterval);

})();
