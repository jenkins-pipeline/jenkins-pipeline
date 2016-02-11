'use strict';

var bodyParser = require('body-parser');
var express    = require('express');
var http       = require('http');
var logger     = require('morgan');
var Path       = require('path');
var find       = require('lodash').find;
var pipelines  = require('./spec/fixtures/pipelines');
var PIPELINE_IDS = ['Web Application', 'Digital Service', 'Transversal Service'];

module.exports = function startServer(port, path, callback) {
  var app = express();
  var server = http.createServer(app);

  app.use(express.static(Path.join(__dirname, path)));
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/api/pipelines', function(req, res) {
    res.json(pipelines);
  });

  app.get('/api/pipelines/ids', function(req, res) {
    res.json(PIPELINE_IDS);
  });

  app.get('/api/pipelines/:id', function(req, res) {
    setTimeout(function() {
      res.json(find(pipelines, function(pipeline) {
        return pipeline.name === req.params.id;
      }));
    }, 2000);
  });

  server.listen(port, callback);
};
