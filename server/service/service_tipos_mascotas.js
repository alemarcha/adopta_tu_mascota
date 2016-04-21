var tiposMascotasData = require('../data/tiposMascotasData.js')
module.exports.service_tipos_mascotas = function (app) {

    app.get('/api/pub/findTiposMascotas', function (req, res, next) {
        var items = {
            categorias: []
        };
        tiposMascotasData.findAllEnabled()
            .then(function (data) {

                console.log('Recuperando elementos' + JSON.stringify(data));
                items.categorias = data;
                console.log('Recuperando elementos' + JSON.stringify(items));
                res.status(200).json(data);

            })
            .fail(function (err) {
                console.log('fallog' + err);
                res.status(500).send(err)
            });

    });
}
