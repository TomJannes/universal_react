/* Initializing passport.js */
var identity = require('./passport/identity');

module.exports = function(app, passport) {
  // serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        if(id == 1){
            return done(null, {id: 1, name: 'Tom'});
      } else {
          return done('not good', null);
      }
    
  });

  passport.use(identity);
};