module.exports = function dataReader(data) {

    data.features.map((sensor,index) => {
        sensor.properties = {
            "id": index,
            "name":sensor.properties.name,
            "pm25":null
        }
    })
    return data;
}
