const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6c78c3d94dace5cff9b2995d2156b88b&query=' + latitude + ',' + longitude + '&units=f';

    request({url: url,json:true}, (error, response) => {
        if(error) {
            callback("Unable to connect to weather service!", undefined);
        } else if(response.body.error) {
            callback("Unable to find location!", undefined);
        } else { 
            
            
            callback(undefined, `${response.body.current.weather_descriptions[0]}. Its currently ${response.body.current.temperature}, but it feels like ${response.body.current.feelslike}`)

        }
    })

}

module.exports = forecast;