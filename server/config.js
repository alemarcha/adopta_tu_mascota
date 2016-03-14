module.exports.configApp = function () {
	
	var express = require('express');
	var bodyParser = require('body-parser');
    var jwt = require('jwt-simple');
    var moment = require('moment');

	var app = express();
    app.jwt=jwt;
    app.moment=moment;
	
	app.use(bodyParser());
	app.use(express.static(__dirname + './../client/es/alemarcha/mascota'));
    app.use('/bower_components', express.static(__dirname + './../bower_components'));

	return app;
	
}