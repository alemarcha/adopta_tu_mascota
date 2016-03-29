var elementosData = require('./data/elementosData.js')
module.exports.service_central = function (app) {
    
	app.get('/api/pub/elements', function (req, res, next) {
		var items={elementos:[]};
		  elementosData.findAllEnabled()
                .then(function (data) {
              
                    console.log('Recuperando elementos' + data);
                    items.elementos=data;
                    res.status(200).json(items);
                  
                   
                })
                .fail(function (err) {
                    console.log('fallog' + err);
                    res.status(500).send(err)
                });
		
	});

    app.get('/api/pub/elements/numTotal', function (req, res, next) {
        
        var total={numTotal:0};
        elementosData.counting()
                .then(function (data) {
                    console.log('counting' + JSON.stringify(data));
                    total.numTotal=data;
                    res.json(total);
                })
                .fail(function (err) {
                    console.log('fallog' + err);
                    res.status(500).send(err);
                }).catch(function(data){
            console.log('cathc');
                    res.status(500).send(data);
        });
        
    });
    
    app.get('/api/pub/elements/:fromPage/:numElements', function (req, res, next) {
        var fromPage = req.params.fromPage;
        var numElements = req.params.numElements;
        var elemFinal= fromPage * numElements;
        var elemInicial=elemFinal-numElements + 1;
		var itemsRes={elementos:[],numTotal:0};
        
//		for (var i = elemInicial; i <= elemFinal; i++) {
//            if(app.items.elementos.length<i){
//                break;
//            }
//           itemsRes.elementos.push(app.items.elementos[i-1]);
//        }
        elementosData.findAllEnabled()
                .then(function (data) {
                    console.log('Recuperando elementos' + JSON.stringify(data));
                    itemsRes.elementos=data;
                    itemsRes.numTotal=data.length;
                    setTimeout(function (){res.json(itemsRes),2000});
                   
                })
                .fail(function (err) {
                    console.log('fallog' + err);
                    res.status(500).send(err)
                });
            
        
		
	});
}