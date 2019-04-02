/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const connect = require('./mongo.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let data = '';
var key = `AIzaSyA9GRm27RY07Q9sddj0JHrkdh8C5hyLjKo`
var address = `parque+de+aguas+claras`
https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`, (resp) => {
  
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });
  
}).on("error", (err) => {
  console.log("Error: " + err.message);
});


app.get('/', (req, res) => {
  pdata = JSON.parse(data)
  res.json( pdata.results[0].geometry.location );
});
app.listen(3001);