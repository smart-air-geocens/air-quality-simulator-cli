# Air Quality Simulator CLI

## Installation

To install the simulator Node CLI application:

1. Clone the project into your local machine;
2. Open Command Prompt window in the folder you have cloned the project;
3. Run this command: `npm install -g .`

You can also install the NPM package from GitHub's NPM registry - see [here](https://github.com/orgs/smart-air-geocens/packages).

## How to run the simulator

To get more information about possible options that can be set before running the simulator, run this command:

`air-quality-simulator --help`

### input data

In this simulator, you can easily change the target locations that you are going to simulate their observations. To this end, after cloning the simulator, go to the data folder. There is a sample `data.json` inside this folder. You can make a similar GeoJSON file like the `data.json`. Or, go to [geojson io](https://geojson.io/#map=2/20.0/0.0) and creating a GeoJSON file of your desired locations, then you should add a name for each station as follow:

```JSON
   ...
   ,{
      "type": "Feature",
      "properties": {
        "name": "Station1"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -115.31249999999999,
          58.58543569119917
        ]
      }
    },
    ...
```

### Interpolation techniques

In this simulator, two different interpolation techniques are used including The IDW (Inverse Distance Weighted) and Kriging techniques. The underlying reason to apply interpolation techniques is for predicting the initial observation for the user selected target station based on observations collected from closest stations.  

The IDW interpolation technique is referred to as deterministic interpolation method because it is directly based on the surrounding collected observations. A second family of interpolation methods consists of geostatistical methods, such as kriging, which are based on statistical models that include autocorrelation—that is, the statistical relationships among the measured points.

In the simulator both techniques are implemented. So, users can easily choose the interpolation model by running this commonad:

`air-quality-simulator --model idw`

or

`air-quality-simulator --model kriging`

Note: the default interpolation method is IDW technique. So, if you want to apply this technique, you do not need to set the model.

### Number of stations

Using environmental data provided by [OpenAQ](https://openaq.org/#/?_k=morc67), we are going to let users select their desired number of OpenAQ stations surrounding each user selected station in the input data. So, you can easily set the number of OpenAQ stations arround each of your selected locations. For example, you can set 20 stations around each selected location by running this command:

`air-quality-simulator -n 20`

Note: the default value is set to 10 stations. It would be better to set this parameter greater than 10 to get better results.

### Time interval

As an example, you can set 2 seconds as the time interval for sending observations to the endpoint by running this command:

`air-quality-simulator -t 2`

### Air Quality types of Observations

In this simulator, six types of air quality observations are considered including PM2.5, PM10, SO2, NO2, O3 and CO. Related information to manipulate their configuration are decribed as follow.

#### PM2.5

PM2.5 refers to atmospheric particulate matter (PM) that have a diameter of less than 2.5 micrometers, which is about 3% the diameter of a human hair [Ref](https://blissair.com/what-is-pm-2-5.htm#:~:text=PM2.,be%20seen%20with%20a%20microscope.).

In simulator, by default it is set that user want to simulate PM2.5 observations for each selected location. However, it can be set as _false_ to ignore simulating this observation. As an example, you can ignore simulating PM2.5 observations by running this command:

`air-quality-simulator --pm25 false`

Walking step can also be set for this observation. It will be applied in [Random Walk](https://en.wikipedia.org/wiki/Random_walk) technique. It has been set to be 1 µg/m³ by default. As an example, you can set walking step by running this command:

`air-quality-simulator --wpm25 2`

In this example, the value of PM2.5 observation will change 2 µg/m³ in each time step.

#### PM10

PM10 refers to small particles of solid or liquid with a diameter smaller than 10 µm [Ref](https://learn.kaiterra.com/en/air-academy/pm10-particulate-matter-pollutes-air-quality#:~:text=What%20Is%20PM10%3F,width%20of%20a%20human%20hair!).

In simulator, by default it is set that user want to simulate PM10 observations for each selected location. However, it can be set as _false_ to ignore simulating this observation. As an example, you can ignore simulating PM10 observations by running this command:

`air-quality-simulator --pm10 false`

Walking step can also be set for this observation. It will be applied in Random Walk technique. It has been set to be 1 µg/m³ by default. As an example, you can set walking step by running this command:

`air-quality-simulator --wpm10 2`

In this example, the value of PM10 observation will change 2 µg/m³ in each time step.

#### SO2

Sulfur dioxide (also sulphur dioxide in British English) is the chemical compound with the formula SO2 [Ref](https://en.wikipedia.org/wiki/Sulfur_dioxide).

In simulator, by default it is set that user DOES NOT want to simulate SO2 observations for each selected location. However, it can be set as _true_ to consider simulating this observation. As an example, you can consider simulating SO2 observations by running this command:

`air-quality-simulator --so2 true`

If you want to consider SO2 simulation, you can also set the walking step for this observation. It will be applied in Random Walk technique. It has been set to be 0.001 ppm by default. As an example, you can walking step by running this command:

`air-quality-simulator --wso2 0.003`

In this example, the value of PM10 observation will change 0.003 ppm in each time step.

#### NO2

Nitrogen dioxide is a chemical compound with the formula NO2 [Ref](https://en.wikipedia.org/wiki/Nitrogen_dioxide).

In simulator, by default it is set that user DOES NOT want to simulate NO2 observations for each selected location. However, it can be set as _true_ to consider simulating this observation. As an example, you can consider simulating NO2 observations by running this command:

`air-quality-simulator --no2 true`

If you want to consider NO2 simulation, you can also set the walking step for this observation. It will be applied in Random Walk technique. It has been set to be 0.001 ppm by default. As an example, you can walking step by running this command:

`air-quality-simulator --wno2 0.003`

In this example, the value of NO2 observation will change 0.003 ppm in each time step.

#### O3

Ozone, or trioxygen, is an inorganic molecule with the chemical formula O3 [Ref](https://en.wikipedia.org/wiki/Ozone).

In simulator, by default it is set that user DOES NOT want to simulate O3 observations for each selected location. However, it can be set as _true_ to consider simulating this observation. As an example, you can consider simulating O3 observations by running this command:

`air-quality-simulator --o3 true`

If you want to consider O3 simulation, you can also set the walking step for this observation. It will be applied in Random Walk technique. It has been set to be 0.001 ppm by default. As an example, you can walking step by running this command:

`air-quality-simulator --wo3 0.003`

In this example, the value of O3 observation will change 0.003 ppm in each time step.

#### CO

Carbon monoxide (CO) is a colorless, odorless, and tasteless flammable gas that is slightly less dense than air [Ref](https://en.wikipedia.org/wiki/Carbon_monoxide).

In simulator, by default it is set that user DOES NOT want to simulate CO observations for each selected location. However, it can be set as _true_ to consider simulating this observation. As an example, you can consider simulating CO observations by running this command:

`air-quality-simulator --co true`

If you want to consider CO simulation, you can also set the walking step for this observation. It will be applied in Random Walk technique. It has been set to be 0.01 ppm by default. As an example, you can walking step by running this command:

`air-quality-simulator --wco 0.03`

In this example, the value of CO observation will change 0.03 ppm in each time step.

### Weather types of Observations

In this simulator, five types of weather observations are considered including Temperature, Pressure, Humidity, Wind Speed, and Wind Direction. Initial observation are retrieved from [OpenWeatherMap API](https://rapidapi.com/blog/lp/openweathermap/?utm_source=google&utm_medium=cpc&utm_campaign=Alpha_104783631314&utm_term=openweathermap_e&gclid=CjwKCAjwt-L2BRA_EiwAacX32cL6dNxEmSEdcyDf7VBgJ-RR1BkTFCXDiSZdTFqJ86MXUf-9Vc3l8BoCG_MQAvD_BwE). To summerize the process, the simulator application will request _n_ number of closest stations around each user selected location. Then, using IDW technique the initial observations are calculated for each observation type. Following the same strategy applied for air quality types of observations, simulated observations will be calculated using Random Walk technique for each time step.

The walking value can be set for each type of observations. It will be applied in Random Walk technique. As an example, you can walking step for each type by running one of following commands:

#### Temperature

It has been set to be 1 degree Celsius (°C) by default. But you can easily set the walking step by running this command:

`air-quality-simulator --wt 2`

In this example, the value of Temperature observation will change 2 °C in each time step.

#### Pressure

It has been set to be 1 Millibar (mbar) by default. But you can easily set the walking step by running this command:

`air-quality-simulator --wp 2`

#### Humidity

It has been set to be 1 Percent by default. But you can easily set the walking step by running this command:

`air-quality-simulator --wh 2`

In this example, the value of Humidity observation will change 2 Percent in each time step.

#### Wind Speed

It has been set to be 1 Meter Per Second (m/s) by default. But you can easily set the walking step by running this command:

`air-quality-simulator --wws 2`

In this example, the value of Wind Speed observation will change 2 m/s in each time step.

#### Wind Direction

It has been set to be 1 degree by default. But you can easily set the walking step by running this command:

`air-quality-simulator --wwd 2`

In this example, the value of Wind Direction observation will change 2 degrees in each time step.

### Setting a combination of options

You can set your desired combination of options by running something similar to following commands:

`air-quality-simulator -n 2 --model kriging -t 2 --co true --wco 0.05 --wws 5 --wt 2`

### Running the simulator

To run the simulator, you will be asked to fill the following information:

1. The URL of OGC SensorThings API endpoint (like: `https://scratchpad.sensorup.com/OGCSensorThings/v1.0`);
2. Username (like: `main`);
3. Password (like: `xxx`);

Please note that all the required information should be entered by the user and they cannot be left empty.

Note: For the users convenience, all the required information can be set once. To this end, please create a ".env" file in the root directory of node cli application. Then, copy the following variables and replace their values with your own information:

`USER_NAME = 'ABC'`

`PASSWORD = 'XXX'`

`STA_ENDPOINT = "https://XXX.com"`

### Stop the Simulator

You can terminate the simulator by running this command:

`Ctrl + c`
