var express = require('express');
var _ = require('lodash');
var userController = require('../controllers/userController');
//var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');

module.exports = function(app, passport) {
    
    //identity redirect
    //redirect to the identity authentication
    //app.get('/auth/identity', passport.authenticate('identity', {scope: 'universal_react', callbackURL: 'http://www.google.be'}));
    /*app.get('/auth/identity', 
        function(req, res, next) {
            passport.authenticate('identity', {scope: 'universal_react', callbackURL: '/auth/identity/callback?redirect=' + req.query.redirect})(req, res, next);
        }
    );
    
    app.get('/auth/identity/callback', passport.authenticate('identity'), function(req, res, next){
        res.cookie('access_token', req.user.access_token, {maxAge: 500000, httpOnly: false});
        res.redirect(req.query.redirect);
    });
    
    app.post('/login', userController.postLogin);*/
    
    app.get('/login',
      function(req, res, next) {
        req.session.redirect = req.query.redirect ? req.query.redirect : '/';  
        next();
      },
      passport.authenticate('myopenidconnect', { failureRedirect: '/login', session: true })
      /*function(req, res) {
        res.redirect('/');
      }*/);
    
    app.get('/callback',
      passport.authenticate('myopenidconnect', { failureRedirect: '/login', session: true }),
      function(req, res) {
        res.locals.data = {
            UserStore: {user: {name: 'Tom', authenticated: !!req.user, token: null}}
        }
        res.redirect(req.session.redirect);
      });
    
    app.post('/api/client', passport.authenticate('bearer', { session: false }), function(req, res){
        return res.json({woot:'bleh'});
    });

    // Retrieves all topics on any endpoint for demonstration purposes
    // If you were indeed doing this in production, you should instead only
    // query the Topics on a page that has topics
    app.get('*', function(req, res, next) {
        //fetch data
        /*res.locals.data =  {
          TopicStore: { topics: topicmap},
          UserStore: { user: user }
        };*/
        
        //handle redirect from identity/callback
        /*if(req.cookies.access_token) {
            req.user = { access_token: req.query.access_token};
        }
        
        var isAuthenticated = req.user ? true : false;
        var token = null;
        if(isAuthenticated) {
            token = req.user.access_token;
        }
        res.locals.data =  {
          UserStore: { user: {name: 'Tom', authenticated: isAuthenticated, token: token} }
        };*/
        res.locals.data = {
            UserStore: {user: {name: 'Tom', authenticated: !!req.user, token: null}}
        }
        next();
    });

global.__STYLE_COLLECTOR_MODULES__ = [];
global.__STYLE_COLLECTOR__ = '';
 


 

    // This is where the magic happens. We take the locals data we have already
    // fetched and seed our stores with data.
    // App is a function that requires store data and url to initialize and return the React-rendered html string
    app.get('*', function (req, res, next) {
        App(JSON.stringify(res.locals.data || {}), req, res, function(data){
            var css = global.__STYLE_COLLECTOR__;
            data = data.replace("TITLE", "Parse title");
            data = data.replace('</head>', '<style id="css-style-collector-data">' + css + '</style></head>');
            res.contentType = "text/html; charset=utf8";
            
            res.end(data);
        });
    });

};