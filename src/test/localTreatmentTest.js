/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const should = chai.should();
const treatment = require('../utils/localTreatment');

describe('get Name', () => {
    it('get Name', (done) => {
      const name = treatment.treatPostCode('Brasília - Federal District, 70.701-010, Brazil');
      name.should.equal('Brasília, Brazil');
      done();
    });
  }).timeout(5000);