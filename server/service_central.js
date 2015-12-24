module.exports.service_central = function (app) {
	app.get('/api/pub/elements', function (req, res, next) {
		var items={elementos:[]};
		 for (var i = 1; i < 10; i++) {
            items.elementos.push({ 
                "id" : "id"+i,
                "titulo" : "Titulo"+ i,
                "valor"  : i
            });
        }
        console.log(items);
		res.json(items);
	});
}