const path = require('path')
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const geoCode = require('./utils/geocode.js');
const foreCast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views loaction
app.set('view engine', 'hbs') 
app.set('views', viewPath) 
hbs.registerPartials(partialsPath) // configuring partials


// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',         
        name: 'Ujjwal Kumar'
    }); 
})

app.get('/about', (req, res) => {
    res.render('about' ,{
        title: 'About',
        name: 'Ujjwal Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        msg: 'Please Help Me!',
        title: 'Help',
        name: 'Ujjwal Kumar'
    })
})


app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    /*
        res.send({
            forecast: 'It is snowing',
            location: 'Philadelphia',
            address: req.query.address
        })
    */
   geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
       if(error) {
           return res.send(error);
       }

       foreCast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send(error);
            }

            res.send({
                forecast: forecastData,
                location,
                
                address: req.query.address
            })
       })

   })
    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name : 'Ujjwal Kumar',
        errorMessage: 'Help article not found'
    })
})

// Error 404 - It should come at last 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ujjwal Kumar',
        errorMessage: ' Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 

