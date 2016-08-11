var elementosData = require('../data/elementosData.js')
module.exports.service_central = function (app) {
    var fields_query=['name','description','address','raza', 'provincia.provincia', 'municipio.nombre'];
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
        var search = datos.search;
        console.log(JSON.stringify(filterby));
        var arraySearch = addSearch(search);
        if(arraySearch && arraySearch.length>0){
            filterby["$or"] = arraySearch;
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
        var search = datos.search;
        var elemFinal = fromPage * numElements;
        var elemInicial = elemFinal - numElements;
        // Definimos el json para ordenar por el campo que recibamos
        var sortbyJson = {};
        sortbyJson[sortby] = -1;
        var arraySearch = addSearch(search);
        if(arraySearch && arraySearch.length>0){
            filterby["$or"] = arraySearch;
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

    function addSearch(search){
        var arraySearch = [];
        if(search && search.length>0){
            var regex_query = new RegExp(".*"+search+".*");

            console.log(JSON.stringify(search));
            fields_query.forEach(function(entry) {
                    var key_value = {};
                    key_value[entry] = regex_query;
                    arraySearch.push(key_value);
                }
            );
            return arraySearch;

        }


    }
}
