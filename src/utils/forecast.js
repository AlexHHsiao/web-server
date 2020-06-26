const request = require('request');

const forecast = (latitude, longitude, _callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4c0331a9c53d70839eb632ca6b39a591&query=${latitude},${longitude}`;

    request({url, json: true}, (error, response, body) => {
        if (error) {
            _callback('Something is wrong');
        } else if (response.body.error) {
            _callback(response.body);
        } else {
            const {current: {temperature, feelslike, weather_descriptions: [desc]}} = body;
            _callback(undefined, `${desc} It is currently ${temperature} degrees out, and it feels like ${feelslike} degree`);
        }
    });
};

module.exports = {forecast};
