const https = require('https');
const Local = require('../models/Local');
const treat = require('../utils/localTreatment');

const key = process.env.API_KEY;

function bodyToLocal(body, local) {
  try {
    local.setName(treat.treatPostCode(body.licenses[0].name))
    local.setLongitude(body.results[0].geometry.lng);
    local.setLatitude(body.results[0].geometry.lat);
  } catch (error) {
    local.setLongitude('error');
    local.setLatitude('error');
  }
}

module.exports = {
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
