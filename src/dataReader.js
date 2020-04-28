module.exports = function dataReader(type,data) {
    for (let i =0 ; i< data.features.length; i++){
        data.features[i].properties = {
            "id": i,
            "name": type + i,
            "pm25":null
        }
    }
    return data;
}
