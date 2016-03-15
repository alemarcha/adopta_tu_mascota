module.exports.service_middleware = function (app) {
 
    
    app.use('/api/private/',function (peticion, respuesta, siguiente) {
		console.log("recibida petición: " + peticion.url);
        var authorization=peticion.headers.authorization;
        if(authorization){
            console.log("authorization: " +peticion.headers.authorization);
            var token = peticion.headers.authorization.split(" ")[1];
            //var token = peticion.headers.authorization;
            var payload=app.jwt.decode(token, app.token_secret);
            console.log("id" + payload.sub);
            console.log("exp" + payload.exp);
            console.log("iat" + payload.iat);
            if (payload.exp <= app.moment().unix()) {
                return res.status(401).send({ message: 'Token has expired' });
            }
            console.log("token: "+ token);
            if (peticion.body && Object.keys(peticion.body).length > 0) {
                console.log("body: " + JSON.stringify(peticion.body));
            }
            siguiente();
        }else{
                return respuesta.status(401).send({ message: 'Token does not exist' });
        }
	});
	
    
}