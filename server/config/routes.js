var express = require('express');
var _ = require('lodash');

//var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');

module.exports = function(app) {
    
    /*app.get('/', function(req, res, next){
        var x = 'te';
        next();
    })*/

    // Retrieves all topics on any endpoint for demonstration purposes
    // If you were indeed doing this in production, you should instead only
    // query the Topics on a page that has topics
    app.get('*', function(req, res, next) {
        //fetch data
        /*res.locals.data =  {
          TopicStore: { topics: topicmap},
          UserStore: { user: user }
        };*/
        res.locals.data =  {
          UserStore: { user: 'Tom' }
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