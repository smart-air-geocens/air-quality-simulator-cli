module.exports = function jsonUpdator(newObservations) {


    let templateJson = {
        "common": {
            "Datastream": {
                "Thing": {
                    "name": null,
                    "description": null,
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

    let updatedArrayObservation = []

    if (newObservations.ThingName != null){
        templateJson.common.Datastream.Thing.name = "T1 "+newObservations.ThingName;
        templateJson.common.Datastream.Thing.description = newObservations.ThingDescription;
    };

    if (newObservations.location != null){
        templateJson.common.Datastream.Thing.Locations[0].name = newObservations.ThingName;
        templateJson.common.Datastream.Thing.Locations[0].description = "The location of sensing station " + newObservations.ThingName;
        templateJson.common.Datastream.Thing.Locations[0].location.coordinates[0] = newObservations.location[0];
        templateJson.common.Datastream.Thing.Locations[0].location.coordinates[1] = newObservations.location[1];
    };

    if (newObservations.temperature != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.temperature,
                "Datastream": {
                    "name": newObservations.ThingName + ":Temperature",
                    "description": "The Temperature Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":Temperature",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observations is calculated based on IDW method applied on OpenWeather API"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "ºC",
                        "name": "Degree Celsius",
                        "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#DegreeCelsius"
                    },
                    "ObservedProperty": {
                        "name": "temperature",
                        "definition": "https://en.wikipedia.org/wiki/Particulates",
                        "description": "PM2.5 Particulates"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };

    if (newObservations.pressure != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.pressure,
                "Datastream": {
                    "name": newObservations.ThingName + ":Pressure",
                    "description": "The Pressure Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":Pressure",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observations is calculated based on IDW method applied on OpenWeather API"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "mbar",
                        "name": "Millibar",
                        "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#Millibar"
                    },
                    "ObservedProperty": {
                        "name": "pressure",
                        "definition": "https://en.wikipedia.org/wiki/Atmospheric_pressure",
                        "description": "Atmospheric Pressure"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };

    if (newObservations.humidity != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.humidity,
                "Datastream": {
                    "name": newObservations.ThingName + ":Humidity",
                    "description": "The Humidity Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":Humidity",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observations is calculated based on IDW method applied on OpenWeather API"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "%",
                        "name": "Percent",
                        "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#Percent"
                    },
                    "ObservedProperty": {
                        "name": "humidity",
                        "definition": "https://en.wikipedia.org/wiki/Humidity",
                        "description": "Relative Humidity"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };
/////
    if (newObservations.windSpeed != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.windSpeed,
                "Datastream": {
                    "name": newObservations.ThingName + ":WindSpeed",
                    "description": "The WindSpeed Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":WindSpeed",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observations is calculated based on IDW method applied on OpenWeather API"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "m/s",
                        "name": "Meter per Second",
                        "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#MeterPerSecond"
                    },
                    "ObservedProperty": {
                        "name": "windSpeed",
                        "definition": "https://en.wikipedia.org/wiki/Wind_speed",
                        "description": "Wind Speed"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };

    if (newObservations.windDirection != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.windDirection,
                "Datastream": {
                    "name": newObservations.ThingName + ":WindDirection",
                    "description": "The WindDirection Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":WindDirection",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observations is calculated based on IDW method applied on OpenWeather API"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "deg",
                        "name": "Degree Angle",
                        "definition": "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#DegreeAngle"
                    },
                    "ObservedProperty": {
                        "name": "windDirection",
                        "definition": "https://en.wikipedia.org/wiki/Wind_direction",
                        "description": "Wind Direction"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };

    if (newObservations.pm25 != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.pm25,
                "Datastream": {
                    "name": newObservations.ThingName + ":PM2.5",
                    "description": "The PM2.5 Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":PM2.5",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observation is calculated based on IDW method from observations obtained initially from aqicn.org"
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
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };

    if (newObservations.pm10 != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.pm10,
                "Datastream": {
                    "name": newObservations.ThingName + ":PM10",
                    "description": "The PM10 Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":PM10",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observation is calculated based on IDW method from observations obtained initially from aqicn.org"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "ug/m3",
                        "name": "microgram per cubic meter",
                        "definition": "https://www.eea.europa.eu/themes/air/air-quality/resources/glossary/g-m3"
                    },
                    "ObservedProperty": {
                        "name": "pm10",
                        "definition": "https://en.wikipedia.org/wiki/Particulates",
                        "description": "PM10 Particulates"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };

    if (newObservations.so2 != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.so2,
                "Datastream": {
                    "name": newObservations.ThingName + ":SO2",
                    "description": "The SO2 Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":SO2",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observation is calculated based on IDW method from observations obtained initially from aqicn.org"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "ppm",
                        "name": "parts per million",
                        "definition": "https://en.wikipedia.org/wiki/Parts-per_notation"
                    },
                    "ObservedProperty": {
                        "name": "so2",
                        "definition": "https://www.ivhhn.org/information/information-different-volcanic-gases/sulphur-dioxide",
                        "description": "Sulphur Dioxide (SO2)"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };

    if (newObservations.no2 != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.no2,
                "Datastream": {
                    "name": newObservations.ThingName + ":NO2",
                    "description": "The NO2 Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":NO2",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observation is calculated based on IDW method from observations obtained initially from aqicn.org"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "ppm",
                        "name": "parts per million",
                        "definition": "https://en.wikipedia.org/wiki/Parts-per_notation"
                    },
                    "ObservedProperty": {
                        "name": "no2",
                        "definition": "https://en.wikipedia.org/wiki/Nitrogen_dioxide",
                        "description": "Nitrogen Dioxide (NO2)"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };

    if (newObservations.o3 != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.o3,
                "Datastream": {
                    "name": newObservations.ThingName + ":O3",
                    "description": "The O3 Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":O3",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observation is calculated based on IDW method from observations obtained initially from aqicn.org"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "ppm",
                        "name": "parts per million",
                        "definition": "https://en.wikipedia.org/wiki/Parts-per_notation"
                    },
                    "ObservedProperty": {
                        "name": "o3",
                        "definition": "https://en.wikipedia.org/wiki/Ozone",
                        "description": "Ozone (O3)"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };

    if (newObservations.co != null){

        updatedArrayObservation.push(
            {
                "result": newObservations.co,
                "Datastream": {
                    "name": newObservations.ThingName + ":CO",
                    "description": "The CO Datastream for station "+ newObservations.ThingName,
                    "Sensor": {
                        "name": newObservations.ThingName + ":CO",
                        "encodingType": "text/html",
                        "metadata":"https://en.wikipedia.org/wiki/Inverse_distance_weighting",
                        "description":"This is a synthetic sensor that its observation is calculated based on IDW method from observations obtained initially from aqicn.org"
                    },
                    "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
                    "unitOfMeasurement": {
                        "symbol": "ppm",
                        "name": "parts per million",
                        "definition": "https://en.wikipedia.org/wiki/Parts-per_notation"
                    },
                    "ObservedProperty": {
                        "name": "co",
                        "definition": "https://en.wikipedia.org/wiki/Carbon_monoxide",
                        "description": "Carbon Monoxide (CO)"
                    }
                },
                "FeatureOfInterest": {
                    "encodingType": "application/vnd.geo+json",
                    "description": "Generated using location details: The location that " + newObservations.ThingName + " is deployed",
                    "name": "Air Quality Station - " + newObservations.ThingName,
                    "feature": {
                        "type": "Point",
                        "coordinates": [ newObservations.location[0], newObservations.location[1] ]
                    }
                }
            }
        );
    };



    return {...templateJson , "Observations":updatedArrayObservation}
}
