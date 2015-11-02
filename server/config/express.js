var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
//var cookieParser = require('cookie-parser');
var path = require('path');
var methodOverride = require('method-override');
var logger = require('morgan');
var config = require('config');


module.exports = function (app, passport) {
  if (config.has('server.port')) {
    process.env.PORT = config.get('server.port');
  }
  if (config.has('server.ip')) {
    process.env.IP = config.get('server.ip');
  }

  app.use(logger('dev'));
  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.set('view cache', false);

  //app.use(cookieParser());

  var sessionConfig = {
    resave: false,
    saveUninitialized: true,
    // Use generic cookie name for security purposes
    //key: 'sessionId',
    secret: 'wooo secret shizzles here',
    // Add HTTPOnly, Secure attributes on Session Cookie
    // If secure is set, and you access your site over HTTP, the cookie will not be set
    /*cookie: {
      httpOnly: true
    },*/
    //store: new MongoStore({ url: secrets.db, autoReconnect: true})
  };

  app.use(session(sessionConfig));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '../..', 'public')));

  var node_env = process.env.NODE_ENV;
  console.log('Environment: ' + node_env);
};