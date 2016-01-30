module.exports.configApp = function () {
	
	var express = require('express');
	var bodyParser = require('body-parser');
    var jwt = require('jwt-simple');

	var app = express();
	
	app.use(bodyParser());
	app.use(express.static(__dirname + './../client/es/alemarcha/mascota'));
    app.use('/bower_components', express.static(__dirname + './../bower_components'));

	app.use(function (peticion, respuesta, siguiente) {
		console.log("recibida petición: " + peticion.url);
		if (peticion.body && Object.keys(peticion.body).length > 0) {
			console.log("body: " + JSON.stringify(peticion.body));
		}
		siguiente();
	});
	
	return app;
	
}