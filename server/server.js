var express = require('express');
var passport = require('passport');

var app = express();

// Bootstrap application settings
require('./config/passport')(app, passport);
require('./config/express')(app, passport);

require('./config/routes')(app, passport);

app.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port'));
});