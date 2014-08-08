
var express = require('express');
var app = express();
app.get('/', function(request, response) {
response.send('Lets kick it!');
});
var port = process.env.PORT || 5001;
app.listen(port, function() {
});
