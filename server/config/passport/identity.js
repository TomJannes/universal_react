var IdentityStrategy = require('./identityStrategy').Strategy;

/*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
 */
module.exports = new IdentityStrategy(null, function(accessToken, refreshToken, profile, done) {
    //todo: enrich with data from local db
    return done(null, profile);
});