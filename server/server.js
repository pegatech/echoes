// PROMISE LIBRARY
global.Promise = require('bluebird');

//DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var pg = require('pg');
var db = require('../db/db.js');
var cookie = require('cookie-parser');
var app = express();


// ROUTE MODULES
var appServer = require('./routes/appRoutes.js');
var authServer = require('./routes/authRoutes.js');
var newUserServer = require('./routes/newUserRoutes.js');
var dbServer = require('./routes/dbRoutes.js');
var signoutServer = require('./routes/signoutRoute.js');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
// TODO: add cookie secret!
app.use(cookie());
app.use('/public', express.static(path.join(__dirname, '/../compiled/client')));
app.use('/node_modules', express.static(path.join(__dirname, '/../node_modules')));
app.use('/styles', express.static(path.join(__dirname, '/../client/styles')));

// ROUTERS
app.use('/', appServer);
app.use('/querydb', dbServer);
app.use('/signin', authServer);
app.use('/signup', newUserServer);
app.use('/signout', signoutServer);

// 404 error handler
app.use(function (req, res, next) {
  var err = new Error('404 Page Not Found.');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  var status = err.status || 500;
  res.status(status).send(err.message);
});

var port = process.env.PORT || 1337;
// LISTENER
app.listen(port, function () {
  console.log('Satan is listening on port: ' + port);
});
