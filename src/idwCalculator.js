module.exports = function idwCalculator(unknownSensors,knownSensors) {
    for(let i = 0 ; i < unknownSensors.features.length; i++){
        let calculatedPm25IDW = 0;
        let weightsSum = 0;
        let finalPM25 = 0;
        let lat1 = unknownSensors.features[i].geometry.coordinates[1];
        let long1 = unknownSensors.features[i].geometry.coordinates[0];
        for (let j=0; j < knownSensors.features.length; j++){

            let lat2 = knownSensors.features[j].geometry.coordinates[1];
            let long2 = knownSensors.features[j].geometry.coordinates[0];
            let weight = 1 / (getDistanceFromLatLonInKm(lat1,long1,lat2,long2));
            weightsSum += weight;
            calculatedPm25IDW =  calculatedPm25IDW + (weight * knownSensors.features[j].properties.pm25);
        }
        finalPM25 = calculatedPm25IDW / weightsSum;
        unknownSensors.features[i].properties.pm25 = finalPM25
    }

    return unknownSensors
}

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

const deg2rad = (deg) => {
    return deg * (Math.PI/180)
}
