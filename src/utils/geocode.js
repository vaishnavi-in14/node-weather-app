const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=b1024595d26de461d94937f83014b6c3&query=' + encodeURIComponent(address) + '&limit=1'

    request({ url, json: true }, (error, response) => {
        const { body: responseBody } = response
        if(error) {
            callback('Unable to connect to location service', undefined)
        } else if (responseBody.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                lat: responseBody.data[0].latitude,
                long: responseBody.data[0].longitude,
                loc: responseBody.data[0].label
            })
        }
    })
}

module.exports = geocode