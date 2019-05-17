/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chai = require('chai');
const Coords = require('../requests/requestCoords.js');

const should = chai.should();

describe('Coords List', () => {
  it('get first value from latitude list', (done) => {
    Coords.getLocales('brasilia').then((listLatitude) => {
      const { lat } = listLatitude[0];
      should.equal(lat, -10.3333333);
      done();
    });

  }).timeout(5000);

  it('get first value from latitude list', (done) => {
    Coords.getLocales('brasilia').then((listLongitude) => {
      const { lng } = listLongitude[0];
      should.equal(lng, -53.2);
      done();
    });
  }).timeout(5000);
});

describe('Coords', () => {
  it('get Latitude', (done) => {
    Coords.getCoords('parana').then((local) => {
      lat = local.getLatitude();
      should.equal(lat, '-24.4842187');
      done();
    });
  }).timeout(5000);

  it('get Longitude', (done) => {
    Coords.getCoords('parana').then((local) => {
      lon = local.getLongitude();
      should.equal(lon, '-51.8148872');
      done();
    });
  }).timeout(5000);
});
