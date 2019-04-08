const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');






const app = express();

// Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirPath));



app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        headline: 'Get the current weather of your location',
        name: 'Kingsley Oha'
    });
});


app.get('/about',(req, res) => {
res.render('about', {
    title: 'About Me',
    msg: 'Honest, gently, compassionate and among those who want to help make the world a better place.',
    name: 'Kingsley Oha'
   });

});
app.get('/help',(req, res) => {
res.render('help', {
    title: 'Help',
    name: 'Kingsley Oha',
    helpText: 'We are here to help you'
   });

});



app.get('/weather',(req, res) => {
 
     if(!req.query.address){
         return res.send({

            error: 'Please provide an address'

         });
     }

      geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error){
           return  res.send({error});
        }
        
        forecast(latitude, longitude, (error, forecastdata) => {
    
            if (error){
                return res.send({error});
            }
          res.send({

            forecast: forecastdata,
            location,
            address: req.query.address

          })
        })
  
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Essen',
    //     address: req.query.address
    });
});




app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Kingsley Oha'
    });
});


app.get('*',(req, res) => {
res.render('404',{
    title: '404',
    errorMessage: '404 Page not found',
    name: 'Kingsley Oha'
});
});


app.listen(3000, () => {
    console.log("Server started on port 3000!");
});