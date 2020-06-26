const request = require('request');

const geocode = (address, _callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxleDEyMTIxMiIsImEiOiJja2Fob3M1bzUwMjdzMndwcDlyODJ3a2VwIn0.kFMXETXvxIlh8fWf9d47bQ&limit=1`;

    request({url, json: true}, (error, response, body) => {
        if (error) {
            _callback('Unable to connect to location services!');
        } else if (response.body.error) {
            _callback(response.body);
        } else {
            const {features} = body;

            if (features.length > 0) {
                const [{center: [longitude, latitude], place_name}] = features;
                _callback(undefined, {latitude, longitude, location: place_name});
            } else {
                _callback('Unable to find location. Try another search.');
            }
        }
    });
};

module.exports = {geocode};
