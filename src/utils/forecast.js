const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/09dd9a14b85f48d061c323973f6f5bd0/' + latitude + ',' + longitude +'?units=si';
    
    //request({url: url, json: true}, (error, response) => {
        // Using object destructing
    request({url, json: true}, (error, {body}) => {

        if (error){
            callback('Unable to connect to weather Service', undefined);
        //}else if(response.body.error){
        }else if(body.error){
         callback('Unable to get the Location', undefined);
        }else {
            callback(undefined, ( body.daily.data[0].summary + " The current temperature is " + body.currently.temperature + ' degree celsius. ' + 'There is a ' + body.currently.precipProbability + ' chance of rain.' )
                // temperature: response.body.currently.temperature,
                // precipitation: response.body.currently.precipProbability,
                // Comment: response.body.daily.data[0].summary
                
            )
        }
            
        
       
    }); 

} 

module.exports = forecast;