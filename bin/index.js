#!/usr/bin/env node

let knownSensorsOriginal = require('../data/knownSensors')
let unknownSensorsOriginal = require('../data/unknownSensors')
let randomWalk = require('../src/randomWalk')
let idwCalculator = require('../src/idwCalculator')
let jsonUpdator = require('../src/jsonUpdator')
let uploadToSTA = require('../src/uploadToSTA')

const prompt = require('prompt-sync')();
require('dotenv').config()

// Reading geoJSON files
let readData = require('../src/dataReader');
let knownSensors = readData("knownSensors", knownSensorsOriginal)
let unknownSensors = readData("AirQ:", unknownSensorsOriginal)

const yargs = require("yargs");
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
    for(let i = 0 ; i < unknownSensors.features.length ; i ++){
        let parameter = {
            "ThingName": unknownSensors.features[i].properties.name,
            "ThingDescription": "The outdoor " + unknownSensors.features[i].properties.name + " is a synthetic sensor for measuring PM2.5",
            "location": unknownSensors.features[i].geometry.coordinates,
            "pm25": unknownSensors.features[i].properties.pm25
        }
        let updatedJson = jsonUpdator(parameter)
        uploadToSTA(updatedJson)
    }

}, options.walkingStep * 1000);









