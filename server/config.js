module.exports.configApp = function () {
	
	var express = require('express');
	var bodyParser = require('body-parser');
    

	var app = express();
	
	app.use(bodyParser());
	app.use(express.static(__dirname + './../client/es/alemarcha/mascota'));
    app.use('/bower_components', express.static(__dirname + './../bower_components'));

	return app;
	
}