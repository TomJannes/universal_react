var express = require('express');

var app = express();

// Bootstrap application settings
require('./config/express')(app);
require('./config/routes')(app);

app.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port'));
});