module.exports = function idwCalculator(unknownSensors,knownSensors) {

    unknownSensors.features.map(unknownSensor => {
        let calculatedPm25IDW = 0;
        let weightsSum = 0;
        let lat1 = unknownSensor.geometry.coordinates[1];
        let long1 = unknownSensor.geometry.coordinates[0];

        knownSensors.features.map(knownSensor => {
            let lat2 = knownSensor.geometry.coordinates[1];
            let long2 = knownSensor.geometry.coordinates[0];
            let weight = 1 / (getDistanceFromLatLonInKm(lat1,long1,lat2,long2));
            weightsSum += weight;
            calculatedPm25IDW =  calculatedPm25IDW + (weight * knownSensor.properties.pm25);
        })
        let finalPM25 = calculatedPm25IDW / weightsSum;
        unknownSensor.properties.pm25 = finalPM25

    })

    return unknownSensors
}

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1);
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
}

const deg2rad = (deg) => {
    return deg * (Math.PI/180)
}
