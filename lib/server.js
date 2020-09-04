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

let db = [];

//Product Routes
app.post('/products', (req, res, next) => {
  let { category, name, display_name, description } = req.body;
  let record = { category, name, display_name, description };
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
})

app.get('/products', (req, res, next) => {
  res.status(200).json(db);
})

//Via class example
app.get('/products/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
})

//Via class example
app.put('/products/:id', (req, res, next) => {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  db = db.map((record) => record.id === parseInt(idToUpdate)) ? updatedRecord : record;
  res.json(updatedRecord);
})

//From class example
app.delete('/products/:id', (req, res, next) => {
  let id = req.params.id;
  db = db.filter((record) => record.id !== parseInt(id));
  res.json({});
})

//Category Routes
app.post('/categories', (req, res, next) => {
  let { name, display_name, description } = req.body;
  let record = { name, display_name, description };
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
})

app.get('/categories', (req, res, next) => {
  res.status(200).json(db);
})

//Via class example
app.get('/categories/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
})

//Via class example
app.put('/categories/:id', (req, res, next) => {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  db = db.map((record) => record.id === parseInt(idToUpdate)) ? updatedRecord : record;
  res.json(updatedRecord);
})

//From class example
app.delete('/categories/:id', (req, res, next) => {
  let id = req.params.id;
  db = db.filter((record) => record.id !== parseInt(id));
  res.json({});
})

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


//function