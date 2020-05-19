const fs = require('fs');

module.exports =  function writeJson(json,fileName) {

     fs.writeFile('./data/' + fileName +'.json', JSON.stringify(json), 'utf8',(err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log(`Initial observations for closest station is created: data --> [%s]`,fileName + '.json');
    });

}
