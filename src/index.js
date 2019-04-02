/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const connect = require('./mongo.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let data = '';
https.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOURKEY', (resp) => {
  
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
  res.json( JSON.parse(data) );
});
app.listen(3001);