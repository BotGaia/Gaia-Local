const Local = require('../models/Local');
const math = require('./math');

function treatResults(results, selector, userInput) {
  let highestIndex;
  let highestScore = -100;
  userInput = userInput.toLowerCase();

  if(selector.length == 1) {
    return selector[0];
  }

  selector.forEach((index) => {
    if(results[index].components.country) {
      if(new RegExp((results[index].components.country).toLowerCase()).test(userInput)) {
        results[index].score += 1;
      }

      else {
        if(results[index].components.country_code) {
          if(new RegExp(`\\b${(results[index].components.country_code).toLowerCase()}\\b`).test(userInput)) {
            results[index].score += 1;
          }

          else {
            results[index].score -= 1;
          }
        }

        else {
          results[index].score -= 1
        }
      }
    }

      if(results[index].components.state) {
          if(new RegExp((results[index].components.state).toLowerCase()).test(userInput)) {
            results[index].score += 1;
          }

          else {
            if(results[index].components.state_code) {
              if(new RegExp(`\\b${(results[index].components.state_code).toLowerCase()}\\b`).test(userInput)) {
                results[index].score += 1;
              }

              else {
                results[index].score -= 1;
              }
            }

            else {
              results[index].score -= 1
            }
          }
        }

      if(results[index].components.city) {
          if(new RegExp((results[index].components.city).toLowerCase()).test(userInput)) {
            results[index].score += 1;
          }

          else {
            if(results[index].components.city_code) {
              if(new RegExp(`\\b${(results[index].components.city_code).toLowerCase()}\\b`).test(userInput)) {
                results[index].score += 1;
              }

              else {
                results[index].score -= 1;
              }
            }

            else {
              results[index].score -= 1
            }
          }
        }

      if(results[index].components.road) {
        if(new RegExp((results[index].components.road).toLowerCase()).test(userInput)) {
          results[index].score += 1;
        }

        else {
          results[index].score -= 1;
        }
      }

      if(results[index].score > highestScore) {
        highestScore = results[index].score;
        highestIndex = index;
      }
  });

  return highestIndex;
}

module.exports = {
  bodyToLocal: (body, local) => {
    try {
	    local.setLongitude(body.results[0].geometry.lng);
	    local.setLatitude(body.results[0].geometry.lat);
    } catch (error) {
	    local.setLongitude('error');
	    local.setLatitude('error');
    }
  },

  bodyToResultsArray: (body, userInput) => {
    try {
      const { results } = body;
      const resultsArray = [];
      const radius = 10;

      results.forEach((value, index) => {
        results[index].isChecked = 0;
        results[index].score = 0;
      });

      results.forEach((value, index) => {
        if(!results[index].isChecked) {
          const selector = [];

          results[index].isChecked = 1;
          selector.push(index);

          results.forEach((value2, index2) => {
            if((index != index2)) {
              const lat = [math.toRadians(results[index].geometry.lat), math.toRadians(results[index2].geometry.lat)];
              const lng = [math.toRadians(results[index].geometry.lng), math.toRadians(results[index2].geometry.lng)];

              if(math.haversine(lat, lng) <= radius) {
                selector.push(index2);
                results[index2].isChecked = 1;
                console.log('close');
              }
            }
          });

          resultsArray.push(results[treatResults(results, selector, userInput)]);
        }
      });

     resultsArray.forEach((value, index) => {
        delete resultsArray[index].annotations;
        delete resultsArray[index].bounds;
        delete resultsArray[index].components;
        delete resultsArray[index].confidence;
        delete resultsArray[index].isChecked;
        delete resultsArray[index].score;
        resultsArray[index].lat = resultsArray[index].geometry.lat;
        resultsArray[index].lng = resultsArray[index].geometry.lng;
        delete resultsArray[index].geometry;
      });

      return resultsArray;
    } catch (err) {
      console.log(err);
      return JSON.parse('[{"name":"error","lat":"error","lng":"error"}]');
    }
  }
};
