var express = require('express');
var queryByHash = require('./queryDB.js');
var app = express();

app.use('/map', express.static(__dirname + '/web'));

app.get('/village/:lat,:lng', function(req, res) {
	queryByHash.searchLatLng([req.params.lat*1,req.params.lng*1], function(err, value) {
		res.set('elapsed', value.elapsed + 'ms')
		res.json({data:value.data});
	});
});

var server = app.listen(3002, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});