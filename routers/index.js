const express = require('express');
const routes = express.Router();
const v1Routes = require('./v1');

module.exports = routes
  .use('/v1', v1Routes)
;
