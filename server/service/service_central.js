var elementosData = require('../data/elementosData.js')
module.exports.service_central = function (app) {

    app.get('/api/pub/elements', function (req, res, next) {
        var items = {
            elementos: []
        };
        elementosData.findAllEnabled()
            .then(function (data) {

                console.log('Recuperando elementos' + data);
                items.elementos = data;
                res.status(200).json(items);


            })
            .fail(function (err) {
                console.log('fallog' + err);
                res.status(500).send(err)
            });

    });

    app.post('/api/pub/elements/numTotal', function (req, res, next) {
        var datos=req.body.element;

        var filterby = datos.filter;
        console.log(JSON.stringify(filterby));
        for(var filter in filterby){
            console.log(filter);
        }

        var itemsRes = {
            elementos: [],
            numTotalPage: 0
        };

        var total = {
            numTotal: 0
        };
        elementosData.counting(filterby)
            .then(function (data) {
                console.log('counting' + JSON.stringify(data));
                total.numTotal = data;
                res.json(total);
            })
            .fail(function (err) {
                console.log('fallog' + err);
                res.status(500).send(err);
            }).catch(function (data) {
            console.log('cathc');
            res.status(500).send(data);
        });

    });

    app.post('/api/pub/elementsPagination/', function (req, res, next) {
        var datos=req.body.element;

        var fromPage = datos.fromPage;
        var numElements = datos.numElements;
        var sortby = datos.sortby;
        var filterby = datos.filter;
        var elemFinal = fromPage * numElements;
        var elemInicial = elemFinal - numElements;
        // Definimos el json para ordenar por el campo que recibamos
        var sortbyJson = {};
        sortbyJson[sortby] = -1;
        console.log(JSON.stringify(filterby));
        for(var filter in filterby){
            console.log(filter);
        }

        var itemsRes = {
            elementos: [],
            numTotalPage: 0
        };

        elementosData.findAllEnabled(elemInicial, elemFinal, sortbyJson, filterby)
            .then(function (data) {
                console.log('Recuperando elementos' + JSON.stringify(data));
                itemsRes.elementos = data;
                itemsRes.numTotalPage = data.length;

                    res.json(itemsRes)


            })
            .fail(function (err) {
                console.log('fallog' + err);
                res.status(500).send(err)
            });


    });
}
