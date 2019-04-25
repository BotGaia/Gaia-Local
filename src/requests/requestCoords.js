const https = require('https');
const Local = require('../models/Local');

const key = process.env.API_KEY;

function bodyToLocal(body, local) {
  try {
    local.setLongitude(body.results[0].geometry.lng);
    local.setLatitude(body.results[0].geometry.lat);
  } catch (error) {
    local.setLongitude('error');
    local.setLatitude('error');
  }
}

function bodyToResultsArray(body) {
  try {
    const { total_results: totalResults } = body;
    let resultsArray = '[';
    let c;

    for (c = 0; c < totalResults; c += 1) {
      resultsArray = `${resultsArray}{"name":"${body.results[c].formatted}","lat":${body.results[c].geometry.lat},"lng":${body.results[c].geometry.lng}},`;
    }

    resultsArray = `${resultsArray.slice(0, -1)}]`;

    return JSON.parse(resultsArray);
  } catch (err) {
    return JSON.parse('[{"name":"error","lat":"error","lng":"error"}]');
  }
}

module.exports = {
  getLocales: (name) => {
    let data = '';
    let results;
    return new Promise((resolve) => {
      https.get(`https://api.opencagedata.com/geocode/v1/json?q=${name}&key=${key}`, (resp) => {
        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          results = bodyToResultsArray(JSON.parse(data));
          resolve(results);
        });
      });
    });
  },

  getCoords: (name) => {
    const local = new Local(name);
    let data = '';
    let body;
    return new Promise((resolve) => {
      local.findMe().then((isFound) => {
        if (isFound) {
          resolve(local);
        } else {
          https.get(`https://api.opencagedata.com/geocode/v1/json?q=${name}&key=${key}`, (resp) => {
            resp.on('data', (chunk) => {
              data += chunk;
            });
            resp.on('end', () => {
              body = JSON.parse(data);
              bodyToLocal(body, local);
              local.saveLocal();
              resolve(local);
            });
          });
        }
      });
    });
  },
};
