/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chai = require('chai');
const Coords = require('../requests/requestCoords.js');

const should = chai.should();

describe('List', () => {
  it('get Latitude', (done) => {
    Coords.getLocales('brasilia').then((value) => {
      const { lat } = value[0];
      should.equal(lat, -10.3333333);
      done();
    });
  }).timeout(5000);

  it('get Longitude', (done) => {
    Coords.getLocales('brasilia').then((value) => {
      const { lng } = value[0];
      should.equal(lng, -53.2);
      done();
    });
  }).timeout(5000);
});

describe('Coords', () => {
  it('get Latitude', (done) => {
    Coords.getCoords('parana').then((value) => {
      lat = value.getLatitude();
      should.equal(lat, '-24.4842187');
      done();
    });
  }).timeout(5000);

  it('get Longitude', (done) => {
    Coords.getCoords('parana').then((value) => {
      lon = value.getLongitude();
      should.equal(lon, '-51.8148872');
      done();
    });
  }).timeout(5000);
});
