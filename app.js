var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
//var html = require('html');

//--самодеятельность:
//var connect = require('connect');
var session = require('express-session');
var users = require('./routes/users');
//самодеятельность--


var app = express();

// view engine setup
app.engine('html', require('hogan-express'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(bcrypt-nodejs);
//var hash = require('bcrypt-nodejs');


//var bcrypt = require('bcrypt-nodejs');
//var hash = bcrypt.hashSync("bacon");

//--самодеятельность:
//app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'cat'
  //resave: false,
  //saveUninitialized: true,
  //cookie: { secure: true, maxAge: 60000  },
}));
//самодеятельность--
var sess;
//app.use('/', routes);

require('./routes/index')(app, sess);


app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  mongoose.connect('mongodb://31.131.22.106/kostyaDB');
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



//module.exports = user;

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;