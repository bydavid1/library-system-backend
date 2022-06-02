var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    morgan = require('morgan')

// setup env file
require('dotenv').config()

/// get environment
let environment = process.env.NODE_ENV;

// setup express
var app = express();

// config app cors
app.use(cors());

// Normal express config defaults
app.use(morgan);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// config express session package
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (environment !== 'production') {
  // development error handler
  app.use(errorhandler());

  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
} 

// connect sequelize
const db = require("./app/models");
db.sequelize.sync();

// import all routes

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// start server
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
