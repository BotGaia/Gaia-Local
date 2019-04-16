const express = require('express');

const requestCoords = require('./requests/requestCoords');

const router = express.Router();

router.get('/local', (req, res) => {
  requestCoords.getCoords(req.query.address).then((value) => {
    res.json({
      lat: value.getLatitude(),
      lng: value.getLongitude(),
    });
  }).catch((err) => {
    res.send(err);
  });
});
module.exports = app => app.use('/', router);
