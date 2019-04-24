const express = require('express');

const requestCoords = require('./requests/requestCoords');

const router = express.Router();

router.get('/local', (req, res) => {
  requestCoords.getCoords(req.query.address).then((value) => {
    res.json(value);
  }).catch((err) => {
    res.send(err);
  });
});
module.exports = app => app.use('/', router);
