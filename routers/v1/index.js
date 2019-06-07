const express = require('express');
const routes = express.Router();
const todoItemRoutes = require('./todoItemRoutes');

module.exports = routes
  .use('/todo-items', todoItemRoutes)
;
