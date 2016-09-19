var provinciasData = require('../data/provinciasData.js')
var mongodb = require('../data/mongodb.js');
module.exports.service_provincias = function (app) {

    app.get('/api/pub/findProvincias', function (req, res, next) {
        var campos = {};
        var query = {};
        campos.provincia = 1;
        campos.identificador = 1;
console.log("llengado aqui");
        provinciasData.findAll(query, campos)
            .then(function (data) {
                if (data != null) {
                  res.status(200).send(data);
                } else {

                };
            })
            .fail(function (err) {
                console.log('fallog' + err);
                res.status(500).send(err)
            });

    });

    app.get('/api/pub/findMunicipios/:idProvincia', function (req, res, next) {
        var id = req.params.idProvincia;
        console.log("provincia: " + id);
        provinciasData.findById(id)
            .then(function (data) {
                if (data != null) {
                    //console.log(JSON.stringify(data));

                    // TODO esta fallando al pasarle las localidades
                    console.log("acabado");
                    res.status(200).send(data[0]);

                } else {
                    res.status(200).send([]);
                }
            })
            .fail(function (err) {
                console.log('fallog' + err);
                res.status(500).send(err)
            });



    });


}
