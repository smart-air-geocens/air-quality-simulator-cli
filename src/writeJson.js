const fs = require('fs');

module.exports =  function writeJson(json,fileName) {

     fs.writeFile('./data/' + fileName +'.json', JSON.stringify(json), 'utf8',(err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log(`JSON file is created and can be downloaded: data --> [%s]`,fileName + '.json');
    });

}
