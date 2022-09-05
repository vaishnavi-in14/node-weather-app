const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vaish'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vaish'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is a help message',
        title: 'Help',
        name: 'Vaish'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    geocode(req.query.search, (error, {lat, long, loc} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(lat, long, (error, data) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                data: data,
                address: loc
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.listen(port, () => {
    console.log('Server is up on' + port)
})

//56 - todo