var util = require('util');
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

  var oldHint = options.loginHint;
  options.loginHint = req.query.login_hint;
  OAuth2Strategy.prototype.authenticate.call(this, req, options);
  options.loginHint = oldHint;
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
      /*profile.id           = json.id;
      profile.displayName  = json.displayName;
      profile.name         = json.name;
      if (json.birthday) profile.birthday = json.birthday;
      if (json.relationshipStatus) profile.relationship = json.relationshipStatus;
      if (json.objectType && json.objectType == 'person') {
        profile.isPerson = true;
      }
      if (json.isPlusUser) profile.isPlusUser = json.isPlusUser;
      if (json.placesLived) profile.placesLived = json.placesLived;
      if (json.language) profile.language = json.language;
      if (json.emails) {
        profile.emails = json.emails;

        profile.emails.some(function(email) {
          if (email.type === 'account') {
            profile.email = email.value
            return true
          }
        })
      } 
      if (json.gender) profile.gender = json.gender;
      if (json.image && json.image.url) {
        var photo = {
          value: json.image.url
        };
        if (json.image.isDefault) photo.type = 'default';
        profile.photos = [photo];
      }

      profile._raw = body;
      profile._json = json;*/

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
};

/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;