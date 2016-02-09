module.exports.service_middleware = function (app) {
 
    
    app.use(function (peticion, respuesta, siguiente) {
		console.log("recibida petición: " + peticion.url);
        var token = peticion.headers.authorization.split(" ")[1];
        console.log("token: "+ token);
		if (peticion.body && Object.keys(peticion.body).length > 0) {
			console.log("body: " + JSON.stringify(peticion.body));
		}
		siguiente();
	});
	
    
}