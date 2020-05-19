#!/usr/bin/env node
const knownSensorsOriginal = require('../data/knownSensors')
const unknownSensorsOriginal = require('../data/unknownSensors')
const randomWalk = require('../src/randomWalk')
const idwCalculator = require('../src/idwCalculator')
const jsonUpdator = require('../src/jsonUpdator')
const uploadToSTA = require('../src/uploadToSTA')
const prompt = require('prompt-sync')();
const yargs = require("yargs");
const readData = require('../src/dataReader');
const getClosestStations = require('../src/getClosestStations')

const writeJSON = require('../src/writeJson')
const requestObservations = require('../src/latestObservations')
const averageObservations = require('../src/averageValue')
const idwInitialObsCalculator = require('../src/idwInitialObsCalculator')


require('dotenv').config()

const inputData = require("../data/data");
const addCountry = require("../src/addCountry");


let addedCountryData;
(async () => {
    addedCountryData = await addCountry(inputData);

    const closestStations = await getClosestStations(addedCountryData, 5)
    const addedObservations = await requestObservations(closestStations, 1, 20)

    const averageObsAdded = await averageObservations(addedObservations)

    const initialObsAdded =  idwInitialObsCalculator(averageObsAdded)
    writeJSON(initialObsAdded, "initial")


})();


// let addedCountryData =  addCountry(inputData);
// console.log(addedCountryData)


// // Reading geoJSON files
// let knownSensors = readData(knownSensorsOriginal)
// let unknownSensors = readData(unknownSensorsOriginal)
//
//
// const options = yargs
//     .usage("Usage: -n <name>")
//     // .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
//     .option("w", {alias: "walkingStep", describe: "The value of walking step", type: "number", default: 10})
//     .option("t", {alias: "timeInterval", describe: "time interval based on second", type: "number", default: 1})
//     .argv;
//
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
//
// function nullInfo(varName) {
//     console.log(varName + " is required and cannot be null");
// }
//
//
// setInterval(function () {
//
//     knownSensors = randomWalk(knownSensors, options.walkingStep)
//     unknownSensors = idwCalculator(unknownSensors, knownSensors)
//
//     const unknownSensorsParameters = unknownSensors.features.map(sensor => {
//         const parameter = {
//             "ThingName": "Station " + sensor.properties.name,
//             "ThingDescription": "The outdoor station " + sensor.properties.name + " is a synthetic station to report PM2.5",
//             "location": sensor.geometry.coordinates,
//             "pm25": sensor.properties.pm25
//         }
//         const updatedJson = jsonUpdator(parameter)
//         uploadToSTA(updatedJson)
//         return null
//     })
//
// }, options.walkingStep * 1000);
//
//
//
//
//
//
//
//
//
