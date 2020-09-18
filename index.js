'use strict';

require('dotenv').config();

const server = require('./lib/server');

const mongoose = require('mongoose');


server.start(process.env.PORT);