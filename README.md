# air-quality-simulator-cli

## Installation 

To install the simulator Node CLI application:

1. Clone the project into your local machine;
2. Open Command Prompt window in the folder you have cloned the project;
3. Run the this command: `npm install -g .`

## Run the Simulator

To get more information about possible options that can be set before running the simulator, run this command:

`air-quality-simulator --help`

As an example, you can set 2 seconds as the time interval for sending observations to the endpoint by running this command:

`air-quality-simulator -t 2`

Or you can set 20 Micrograms per Cubic Meter as the walking step that will be applied in [Random Walk](https://en.wikipedia.org/wiki/Random_walk) technique by running this command:

`air-quality-simulator -w 20` 

You can also set both options together by running this command:

`air-quality-simulator -t 2 -w 20`

Running the simulator requires the following information:

1. Username (like: `main`);
2. Password (like: `xxx`);
3. The URL of OGC SensorThings API endpoint (like: `https://scratchpad.sensorup.com/OGCSensorThings/v1.0`); 

Please note that all required information should be entered by the user and they cannot be left empty. 

