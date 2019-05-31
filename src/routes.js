const express = require('express');
const requestCoords = require('./requests/requestCoords');
const endpoints = require('./utils/endpoints');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(endpoints.getJson());
});

router.get('/local', (req, res) => {
  requestCoords.getCoords(req.query.address).then((resultLocal) => {
    res.json({
      lat: resultLocal.getLatitude(),
      lng: resultLocal.getLongitude(),
    });
  }).catch((err) => {
    res.send(err);
  });
});

router.get('/listLocales', (req, res) => {
  requestCoords.getLocales(req.query.address).then((resultListLocales) => {
    res.json(resultListLocales);
  }).catch((err) => {
    res.send(err);
  });
});

module.exports = app => app.use('/', router);
