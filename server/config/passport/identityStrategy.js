/*var util = require('util');
var OAuth2Strategy = require('passport-oauth2');
var InternalOAuthError = require('passport-oauth2').InternalOAuthError;

function Strategy(options, verify){
    options = options || {};
    //todo: get from config file
    options.clientID = 'xW6hZeHz';
    options.clientSecret = 'uyNh8Yjnfw2qidsD7mgK';
    //options.callbackURL = 'https://universal-react-tomj.c9.io/auth/identity/callback';
    options.authorizationURL = 'https://implicit-auth-tomj.c9.io/oauth/authorization';
    options.tokenURL = 'https://implicit-auth-tomj.c9.io/oauth/token';
    OAuth2Strategy.call(this, options, verify);
    this.name = 'identity';
}

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.authenticate = function(req, options) {
  options || (options = {});

  options.session = false;

  OAuth2Strategy.prototype.authenticate.call(this, req, options);
};

Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get('https://implicit-auth-tomj.c9.io/profile', accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

    try {
      var json = JSON.parse(body);

      var profile = { 
        provider: 'identity',
        id: json._id,
        username: json.username
      };

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
};


exports = module.exports = Strategy;


exports.Strategy = Strategy;*/