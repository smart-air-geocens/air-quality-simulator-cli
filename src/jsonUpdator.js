module.exports = function jsonUpdator(newObservations) {
    let koreanThingName;
    if(newObservations.ThingName === "AirQ:0"){
        koreanThingName = "Bugang-myeon"
    }
    else if (newObservations.ThingName === "AirQ:1"){
        koreanThingName = "Sinheung-dong"
    }
    else if (newObservations.ThingName === "AirQ:2"){
        koreanThingName = "Areum-dong"
    }
    else if (newObservations.ThingName === "AirQ:3"){
        koreanThingName = "Hansol-dong"
    }
    else if (newObservations.ThingName === "AirQ:4"){
        koreanThingName = "Osong-eup"
    }
    let templateJson = {
        "common": {
            "Datastream": {
                "Thing": {
                    "name": null,
                    "description": null,
                    "properties": {
                        "city": koreanThingName + ", Sejong City, South Korea",
                    },
                    "Locations": [{
                        "name": "",
                        "description":"",
                        "location": {
                            "type": "Point",
                            "coordinates": [ 0, 0 ]
                        }
                    }]
                }
            }
        },
        "Observations": []
    };

    if (newObservations.ThingName != null){
        templateJson.common.Datastream.Thing.name = koreanThingName;
        templateJson.common.Datastream.Thing.description = "Sensing station located in " + koreanThingName + ", Sejong City, South Korea";
    };

    if (newObservations.location != null){
        templateJson.common.Datastream.Thing.Locations[0].name = koreanThingName;
        templateJson.common.Datastream.Thing.Locations[0].description = "The location of sensing station located in" + koreanThingName + ", Sejong City, South Korea";
        templateJson.common.Datastream.Thing.Locations[0].location.coordinates[0] = newObservations.location[0];
        templateJson.common.Datastream.Thing.Locations[0].location.coordinates[1] = newObservations.location[1];
    };

    if (newObservations.pm25 != null){

        templateJson.Observations.push(
            {
                "result": newObservations.pm25,
                "Datastream": {
                    "name": koreanThingName + " "+ newObservations.ThingName + ":PM2.5",
                    "description":koreanThingName + " "+ newObservations.ThingName + ":PM2.5",
                    "Sensor": {
                        "name": koreanThingName + ":PM2.5",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observation is calculated based on IDW method from other known sensors"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "ug/m3",
                        "name": "microgram per cubic meter",
                        "definition": "https://www.eea.europa.eu/themes/air/air-quality/resources/glossary/g-m3"
                    },
                    "ObservedProperty": {
                        "name": "pm25",
                        "definition": "https://en.wikipedia.org/wiki/Particulates",
                        "description": "PM2.5 Particulates"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location provided by aqicn.org for the city of Sejong",
                    "name": "Air Quality Station - "+koreanThingName+", Sejong, South Korea",
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };
    return templateJson
}
