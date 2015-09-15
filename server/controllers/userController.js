var passport = require('passport');

exports.postLogin = function(req, res){
    passport.authenticate('local', function(err, user, info){
        req.login(user, function(err){
            if(err) return res.send(err);
            res.end('success');
        });
        /*if(!user) res.send(err);
        if(user) res.end('Success');*/
    })(req, res);
};