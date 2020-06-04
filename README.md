# air-quality-simulator-cli

## Installation

To install the simulator Node CLI application:

1. Clone the project into your local machine;
2. Open Command Prompt window in the folder you have cloned the project;
3. Run this command: `npm install -g .`

## How to run the simulator

To get more information about possible options that can be set before running the simulator, run this command:

`air-quality-simulator --help`

### input data

In this simulator, you can easily change the target locations that you are going to simulate their observations. To this end, after cloning the simulator, go to the data folder. There is a sample `data.json` inside this folder. You can make a similar GeoJSON file like the `data.json`. Or, go to [geojson io](https://geojson.io/#map=2/20.0/0.0) and creating a GeoJSON file of your desired locations, you can set a name for each station as follow:

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

### Number of stations

Using environmental data provided by [OpenAQ](https://openaq.org/#/?_k=morc67), we are going to let users select their desired number of OpenAQ stations surrounding each user selected station in the input data. So, you can easily set the number of OpenAQ stations arround each of your selected locations. For example, you can set 2 stations around each selected location by running this command:

`air-quality-simulator -n 2`

### Time interval

As an example, you can set 2 seconds as the time interval for sending observations to the endpoint by running this command:

`air-quality-simulator -t 2`

### Walking step

As an example, you can set 20 Micrograms per Cubic Meter as the walking step that will be applied in [Random Walk](https://en.wikipedia.org/wiki/Random_walk) technique by running this command:

`air-quality-simulator -w 20`

### Setting a combination of options

You can also set all options together by running this command:

`air-quality-simulator -n 2 -t 2 -w 20`

Running the simulator requires the following information:

1. The URL of OGC SensorThings API endpoint (like: `https://scratchpad.sensorup.com/OGCSensorThings/v1.0`);
2. Username (like: `main`);
3. Password (like: `xxx`);

Please note that all the required information should be entered by the user and they cannot be left empty.

### Stop the Simulator

You can terminate the simulator by running this command:

`Ctrl + c`
