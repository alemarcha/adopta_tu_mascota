module.exports.service_central = function (app) {
	app.get('/api/pub/elements', function (req, res, next) {
		var items=[];
		 for (var i = 1; i < 10; i++) {
            vm.items.push({ 
                "id" : "id"+i,
                "titulo" : "Titulo"+ i,
                "valor"  : i
            });
        }
        console.log(items);
		res.json(items);
	});
}