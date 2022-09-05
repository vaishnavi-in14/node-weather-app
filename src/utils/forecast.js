const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c5685be1a168313c06deaba5171960cd&query=' + lat + ',' + long

    request({ url, json: true }, (error, response) => {
        const { body: responseBody } = response
        if(error) {
            callback('Unable to connect to weather service')
        } else if(responseBody.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, `${responseBody.current.weather_descriptions[0]}. It is currently ${responseBody.current.temperature} degrees out there. But feels like ${responseBody.current.feelslike}`)
        }
    })
}

module.exports = forecast