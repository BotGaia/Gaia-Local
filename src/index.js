const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnection = require('./config/mongooseConnection');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongooseConnection.connect();

require('./routes')(app);

app.get('/', (req, res) => {
  res.json({ Hello: 'World' });
});

app.listen(3001);

module.exports = app;
