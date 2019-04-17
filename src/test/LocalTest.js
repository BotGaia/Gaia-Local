/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chai = require('chai');

const should = chai.should();
const Local = require('../models/Local.js');

describe('setLatitude', () => {
  it('set latitude', () => {
    const newLocal = new Local();
    newLocal.setLatitude('lat');
    should.equal(newLocal.getLatitude(), 'lat');
  });
});

describe('setLongitude', () => {
  it('set longitude', () => {
    const newLocal = new Local();
    newLocal.setLongitude('lng');
    should.equal(newLocal.getLongitude(), 'lng');
  });
});
