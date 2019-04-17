/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chai = require('chai');
const Coords = require('../requests/requestCoords.js');

const should = chai.should();
let lat = '';
let lon = '';

describe('getLat', () => {
  it('get Latitude', (done) => {
    Coords.getCoords('brasilia').then((value) => {
      lat = value.getLatitude();
      should.equal(lat, '-10.3333333');
      done();
    });
  }).timeout(5000);
});

describe('getLon', () => {
  it('get Longitude', (done) => {
    Coords.getCoords('brasilia').then((value) => {
      lon = value.getLongitude();
      should.equal(lon, '-53.2');
      done();
    });
  }).timeout(5000);
});
