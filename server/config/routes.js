var express = require('express');
var _ = require('lodash');
var userController = require('../controllers/userController');
//var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');

module.exports = function(app, passport) {
    
    //identity redirect
    //redirect to the identity authentication
    //app.get('/auth/identity', passport.authenticate('identity', {scope: 'universal_react', callbackURL: 'http://www.google.be'}));
    app.get('/auth/identity', 
        function(req, res, next) {
            passport.authenticate('identity', {scope: 'universal_react', callbackURL: '/auth/identity/callback?redirect=' + req.query.redirect})(req, res, next);
        }
    );
    
    app.get('/auth/identity/callback', passport.authenticate('identity'), function(req, res){
        //todo: add cookie or something
        res.redirect(req.query.redirect);
    });
    
    app.post('/login', userController.postLogin);

    // Retrieves all topics on any endpoint for demonstration purposes
    // If you were indeed doing this in production, you should instead only
    // query the Topics on a page that has topics
    app.get('*', function(req, res, next) {
        //fetch data
        /*res.locals.data =  {
          TopicStore: { topics: topicmap},
          UserStore: { user: user }
        };*/
        var isAuthenticated = req.user ? true : false;
        res.locals.data =  {
          UserStore: { user: {name: 'Tom', authenticated: isAuthenticated} }
        };
        next();
    });

    // This is where the magic happens. We take the locals data we have already
    // fetched and seed our stores with data.
    // App is a function that requires store data and url to initialize and return the React-rendered html string
    app.get('*', function (req, res, next) {
        App(JSON.stringify(res.locals.data || {}), req, res, function(data){
            data = data.replace("TITLE", "Parse title");
            res.contentType = "text/html; charset=utf8";
            res.end(data);
        });
    });

};