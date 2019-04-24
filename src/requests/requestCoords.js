const https = require('https');

const key = process.env.API_KEY;

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
  getCoords: (name) => {
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
};
