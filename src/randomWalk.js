module.exports = function randomWalk(knownSensors,walkingStep) {
    for(let i = 0 ; i < knownSensors.features.length; i++){
        let value = knownSensors.features[i].properties.pm25
        if(value == null){
            value = categoryPredictor();
        }
        knownSensors.features[i].properties.pm25 = randomWalkUpdator(value,walkingStep)
    }

    return knownSensors
}

// if the first parameter is null, it will assign each point to a category
function categoryPredictor() {
    let max;
    let min;
    let randomCategory;
    let randomValue;

    randomCategory = Math.floor(Math.random() * 6) + 1;
    switch (randomCategory) {
        case 1:{
            min = 0;
            max = 50;
            break
        }
        case 2:{
            min = 50;
            max = 100;
            break
        }
        case 3:{
            min = 100;
            max = 150;
            break
        }
        case 4:{
            min = 150;
            max = 200;
            break
        }
        case 5:{
            min = 200;
            max = 300;
            break
        }
        default:{
            min = 300;
            max = 500;
            break
        }
    }
    randomValue = ((min + max) / 2);
    return randomValue;
}

function randomWalkUpdator(latestValue,walkingStep) {
    let min = 0;
    let max = 500;

    if(Math.random() >= 0.5)
        latestValue += walkingStep;
    else
        latestValue -= walkingStep;
    if(latestValue > max )
        latestValue = max;
    if(latestValue < min)
        latestValue = min;
    return latestValue;
}
