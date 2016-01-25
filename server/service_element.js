module.exports.service_element = function (app) {

	app.get('/api/pub/element/:id', function (req, res, next) {
		console.log(req.params.id)
		var element = {"precio":111,"titulo":"Elemento"+req.params.id,"descripcion":"Esta es la descripcion de "+req.params.id, "fechaPublicacion":"22/12/2015 22:21:15", "autor":"Usuario "+req.params.id};
		if(req.params.id === 'id2'){
			res.status(404).send('Sesión caducada');
		}else{
			setTimeout(function (){res.json(element)},1000);     
		}

	});

	app.post('/api/pub/alta/element/', function (req, res, next) {
		var element = req.body;
		console.log(element)
		console.log(element.elementData)
		console.log(app.items.elementos);
		console.log(app.items.elementos.length);
		

	});
}