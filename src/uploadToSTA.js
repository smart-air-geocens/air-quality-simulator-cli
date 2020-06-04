const axios = require('axios')

module.exports = function uploadToSTA(sampleJson) {
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    let basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': basicAuth
    }
    axios.post(process.env.STA_ENDPOINT + "/s/Observations",sampleJson, {headers: headers})
        .then(response => {
            console.log("Successfully uploaded to " + response.data[0]['@iot.selfLink'])

        }).catch(function(error) {
        console.log(error);
    });
}
