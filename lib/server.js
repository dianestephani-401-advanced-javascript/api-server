'use strict';
const express = require('express');
const app = express();
const timestamp = require('./middleware/timestamp');
const logger = require('./middleware/logger');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(timestamp);
app.use(logger);
app.get('/',(req, res, next) => {
  res.status(200).json('test');
});

//Via class demo 07
app.use('*', notFoundHandler);
app.use(errorHandler);


function start(port){
  app.listen(port,() => {
    console.log(`Server running on ${port}`);
  })
}


module.exports = {
  start: start,
  server: app
}