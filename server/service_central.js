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
    
    app.get('/api/pub/elements/:fromPage/:numElements', function (req, res, next) {
        var fromPage = req.params.fromPage;
        var numElements = req.params.numElements;
        var elemFinal= fromPage * numElements;
        var elemInicial=elemFinal-numElements + 1;
		var items={elementos:[]};
		 for (var i = elemInicial; i <= elemFinal; i++) {
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