var express = require('express');
var passport = require('passport');

var app = express();

// Bootstrap application settings
require('./config/mongo')();
require('./config/passport')(app, passport);
require('./config/express')(app, passport);

require('./config/routes')(app, passport);

app.listen(process.env.PORT, process.env.IP, function(){
  console.log('Server started on port ' + process.env.PORT);
});