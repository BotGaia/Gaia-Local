const mongoose = require('mongoose');
const LocalSchema = require('../db/localSchema');

const LocalModel = mongoose.model('LocalModel', LocalSchema);

module.exports = class Local {
  constructor(name) {
    this.local = new LocalModel({
      name,
      latitude: '',
      longitude: '',
    });
  }

  setLatitude(latitude) {
    this.local.latitude = latitude;
  }

  getLatitude() {
    return this.local.latitude;
  }

  setLongitude(longitude) {
    this.local.longitude = longitude;
  }

  getLongitude() {
    return this.local.longitude;
  }

  getLocal() {
    return this.local;
  }

  saveLocal() {
    this.local.save();
  }

  findMe() {
    return new Promise((resolve) => {
      LocalModel.findOne({ name: this.local.name },
        (err) => { if (err) { resolve(false); } }).then((local) => {
        if (local) {
          this.local = local;
          resolve(true);
        }

        resolve(false);
      });
    });
  }
};
