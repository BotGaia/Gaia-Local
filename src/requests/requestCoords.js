const https = require('https');
const Local = require('../models/Local');
const haversine = require('../utils/haversine');

const key = process.env.API_KEY;

function toRadians(num) {
  return num * (Math.PI/180);
}

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
    const { results } = body;
    const { total_results : totalResults } = body;
    const resultsArray = [];
    const radius = 5;

    results.forEach((value, index) => {
      results[index].isChecked = 0;
    });

    results.forEach((value, index) => {
      if(!results[index].isChecked) {
        const selector = [];

        results[index].isChecked = 1;
        selector.push(index);

        results.forEach((value2, index2) => {
          if((index != index2)) {
            const lat = [toRadians(results[index].geometry.lat), toRadians(results[index2].geometry.lat)];
            const lng = [toRadians(results[index].geometry.lng), toRadians(results[index2].geometry.lng)];

            if(haversine.distance(lat, lng) <= radius) {
              selector.push(index2);
            }
          }
        });

        //resultsArray.push(results[treatResults(results, selector)]);
      }
    });

    return resultsArray;
  } catch (err) {
    console.log(err);
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
