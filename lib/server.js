'use strict';
const express = require('express');
const app = express();
const timestamp = require('./middleware/timestamp');
const logger = require('./middleware/logger');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(timestamp);
app.use(logger);
app.get('/',(req, res, next) => {
  res.status(200).json('test');
});


function start(port){
  app.listen(port,() => {
    console.log(`Server running on ${port}`);
  })
}


module.exports = {
  start: start,
  server: app
}