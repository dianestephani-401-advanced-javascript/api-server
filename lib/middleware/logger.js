'use strict';

module.exports = (req, res, next) => {
  console.log(req.path, req.method, req.timestamp);
  next();
}