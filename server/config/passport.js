var BearerStrategy = require('passport-http-bearer')
/* Initializing passport.js */
var identity = require('./passport/identity');
var User = require('../models/user');
var refresh = require('./passport/openidRefresh');
var config = require('config');

module.exports = function(app, passport) {
  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });
  
  passport.deserializeUser(function(identifier, done) {
    User.findById(identifier, function(err, user) {
      if (err) { return done(err, null); }
      if (!user) { return done(null, false); }
      var needsToRefresh = new Date() > new Date(user.accessToken.expiryDate.getTime() - config.get('openidconnect.refresh_treshold') * 60000);
      if (needsToRefresh) {
        refresh.requestNewAccessToken('myopenidconnect', user.refreshToken.token, function(refreshErr, accessToken, refreshToken, params) {
          if (refreshErr) { return done(refreshErr, null); }
          user.accessToken.token = accessToken;
          user.accessToken.expiryDate = params.expires_in;
          user.refreshToken.token = refreshToken;
          user.save(function(userSaveErr) {
            if (userSaveErr) { return done(userSaveErr, null); }
            return done(null, user);
          });
        });
      } else {
        return done(null, user);
      }
    });
  });
  
  
  
  passport.use(new BearerStrategy(
    function(token, done) {
      
      //todo: check if token is still valid en renew if needed
      return done(null, {id: 2, name:'bla'});
      /*User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });*/
    }
  ));

  passport.use('myopenidconnect', identity);
  refresh.use('myopenidconnect', identity);
};