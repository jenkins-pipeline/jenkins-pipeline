'use strict';

var bodyParser = require('body-parser');
var express    = require('express');
var http       = require('http');
var logger     = require('morgan');
var Path       = require('path');
var pipelines  = require('./spec/fixtures/pipelines');

module.exports = function startServer(port, path, callback) {
  var app = express();
  var server = http.createServer(app);

  app.use(express.static(Path.join(__dirname, path)));
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));

  // GET `/api` -> JSON mocking the pipelines
  app.get('/api/pipelines', function(req, res) {
    res.json(pipelines);
  });

  server.listen(port, callback);
};
