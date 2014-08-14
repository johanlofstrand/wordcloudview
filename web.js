

var express = require('express'),
logger = require('logger'),
http = require('http'),
json = require('json');

var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/public', express.static(__dirname + '/public'));


app.get('/', function(req, res) {
		retrieveWordCounts(function(ready) {
		res.render("index.ejs",{wordcounts:totalData});
	});
});

var port = process.env.PORT || 5001;
app.listen(port, function() {
});

var options = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  method: 'GET'
};

var totalData="";
var retrieveWordCounts = function (ready) {
	totalData="";
	var req = http.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    totalData+=chunk;
	  });
	  res.on('end', function () {
	    ready();
	  });
	});
	req.on('error', function(e) {
	  console.log('retrieveSonar: problem with request: ' + e.message);
	});

	req.end();

}
