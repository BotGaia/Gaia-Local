/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const connect = require('./connection.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let data = '';
let key = `yourkey`;
let address = `brasilia`
https.get(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${key}`, (resp) => {
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });
  
}).on("error", (err) => {
  console.log("Error: " + err.message);
});


app.get('/', (req, res) => {

  pdata = JSON.parse(data);
  res.json(pdata.results[1].geometry) ;
});
app.listen(3001);