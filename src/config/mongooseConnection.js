const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    mongoose.Promise = global.Promise;
    const options = {
      user: 'wendylocal',
      pass: 'admin123',
      keepAlive: true,
      socketTimeoutMS: 540000,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      autoIndex: false,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
    };
    mongoose.connect('mongodb://mongo:27017/admin', options).then(() => {
    }).catch();
  },
};
