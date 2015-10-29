'use strict';
//var IdentityStrategy = require('./identityStrategy').Strategy;
var OidcStrategy = require('./openIdConnectStrategy').Strategy;
var config = require('config');
var jwt = require('jsonwebtoken');
var fs = require('fs'); // todo move to application startup
var User = require('../../models/user');


/*module.exports = new IdentityStrategy(null, function(accessToken, refreshToken, profile, done) {
    //todo: get local user here + parse profile settings + add accesstoken
    profile.access_token = accessToken;
    return done(null, profile);
});*/

module.exports = new OidcStrategy({
  authorizationURL: config.get('authorization.serverurl') + '/dialog/authorize',
  tokenURL: config.get('authorization.serverurl') + '/oauth/token',
  userInfoURL: config.get('authorization.serverurl') + '/oauth/profile',
  clientID: config.get('client.id'),
  clientSecret: config.get('client.secret'),
  callbackURL: config.get('authorization.callbackurl'),
  responseType: 'code',
  prompt: 'none'
},
function(iss, sub, profile, accessToken, refreshToken, params, done) {
  var rawIdToken = params.id_token;
  fs.readFile('public_key.pem', 'utf8', function(err, cert) {
    if (err) { throw err; }
    var verificationChecks = {
      audience: config.get('client.id'),
      issuer: config.get('openidconnect.issuer')
    };
    jwt.verify(rawIdToken, cert, verificationChecks, function(verificationErr, decoded) {
      if (verificationErr) { return done(verificationErr, null); }
      User.findOne({sub: decoded.sub}, function(findUserErr, user) {
        if (findUserErr) { return done(findUserErr, null); }
        if (!user) { return done(null, false); }
        user.accessToken = {
          token: accessToken,
          expiryDate: params.expires_in
        };
        user.refreshToken = {
          token: refreshToken
        };
        user.save(function(userSaveErr) {
          if (userSaveErr) { return done(userSaveErr); }
          return done(null, user);
        });
      });
    });
  });
});