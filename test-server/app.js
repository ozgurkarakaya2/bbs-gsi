var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyBJm2l_LnRrSaB2UYOaotP89xyhvn_ZBJo",
  authDomain: "poc-web-push.firebaseapp.com",
  databaseURL: "https://poc-web-push.firebaseio.com"
};
firebase.initializeApp(config);

var messagepush = require('./routes/messagePushRouter');
var app = express();

var server = app.listen(8000, function() {
  console.log(new Date().toISOString() + ": server started on port 8000");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/messagepush',messagepush);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
