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
require('dotenv').config()


// Reading geoJSON files
let knownSensors = readData(knownSensorsOriginal)
let unknownSensors = readData(unknownSensorsOriginal)


const options = yargs
    .usage("Usage: -n <name>")
    // .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .option("w", {alias: "walkingStep", describe: "The value of walking step", type: "number", default: 10})
    .option("t", {alias: "timeInterval", describe: "time interval based on second", type: "number", default: 1})
    .argv;

// Prompt user to input required information in console.
console.log("Please input required information in command line.");

process.env.USER_NAME = prompt('Username: ');
while (!process.env.USER_NAME){
    nullInfo("username")
    process.env.USER_NAME = prompt('Username: ');
}

process.env.PASSWORD = prompt('Password: ',{echo: '*'})
while (!process.env.PASSWORD){
    nullInfo("password")
    process.env.PASSWORD = prompt('Password: ');
}

process.env.STA_ENDPOINT = prompt('STA-Endpoint: ')
while (!process.env.STA_ENDPOINT){
    nullInfo("STA-Endpoint")
    process.env.STA_ENDPOINT = prompt('STA-Endpoint: ');
}


function nullInfo(varName) {
    console.log(varName + " is required and cannot be null");
}


setInterval( function () {

    knownSensors =  randomWalk(knownSensors, options.walkingStep)
    unknownSensors = idwCalculator(unknownSensors,knownSensors)

    unknownSensors.features.map(sensor => {
            let parameter = {
                "ThingName": "Station " + sensor.properties.name,
                "ThingDescription": "The outdoor station " + sensor.properties.name + " is a synthetic station to report PM2.5",
                "location": sensor.geometry.coordinates,
                "pm25": sensor.properties.pm25
            }
            let updatedJson = jsonUpdator(parameter)
            uploadToSTA(updatedJson)
    })

}, options.walkingStep * 1000);









