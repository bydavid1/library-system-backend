var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    morgan = require('morgan');


// setup env file
require('dotenv').config()

/// get environment
let environment = process.env.NODE_ENV;
console.log(environment);

// setup express
var app = express();

// config app cors
app.use(cors());

// Normal express config defaults
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
const db = require("./models");
db.sequelize.sync();

// import all routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/role', require('./routes/role.routes'));

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
