var elementosData = require('../data/elementosData.js')
var usuariosData = require('../data/usuariosData.js')
var mongodb = require('../data/mongodb.js');
var Q = require('q');
module.exports.service_element = function (app) {


    app.get('/api/pub/element/:id', function (req, res, next) {
        var checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        if (!checkForHexRegExp.test(req.params.id)) {
            console.log('identificador no es valido');
            res.status(404).send(req.params.id)
        } else {
            console.log("Buscando elemento: " + req.params.id);
            elementosData.find(req.params.id)
                .then(function (data) {
                    if (data && data.length == 1) {
                        console.log('Recuperando elemento' + JSON.stringify(data));

                        res.status(200).json(data[0]);
                    } else {
                        console.log('FALLO elemento' + JSON.stringify(data));
                        res.status(404).send(data);
                    }
                })
                .fail(function (err) {
                    console.log('fallog' + err);
                    res.status(404).send(err)
                });

        }
    });

    app.post('/api/pub/element/', function (req, res, next) {
        var element = req.body.element;

        console.log("Body:" + JSON.stringify(req.body));
        console.log("Body:" + element.name)


        elementosData.inserting(element)
            .then(function (data) {

                console.log('Creado elemento' + JSON.stringify(data.ops[0]));
                res.status(200).send(data.ops[0]);

            })
            .fail(function (err) {
                console.log('fallog' + err);
                res.status(500).send(err)
            });
    });

    app.put('/api/pub/element/:id', function (req, res, next) {
        var id = req.params.id;
        var elemento = req.body.element;
        console.log("Body:" + elemento.name)
        var _id = new mongodb.ObjectId(id);
        elemento._id = _id;

        elementosData.updating(elemento, {
                _id: _id
            })
            .then(function (data) {
                console.log('Actualizado elemento' + JSON.stringify(data));
                res.status(200).send(data);

            })
            .fail(function (err) {
                console.log('fallog' + err);
                res.status(500).send(err)
            });
    });


    app.post('/api/priv/element/upload', function (req, res) {
        var sampleFile;

        if (!req.files) {
            res.send('No files were uploaded.');
            return;
        }


        //console.log(req);
        //console.log(__dirname);
        var files = req.files;
        var filePrincipal = req.body.principal;
        console.log(files);
        console.log(filePrincipal);
        console.log(req.body);
        var elemento = JSON.parse(req.body.info);
        elemento.imagenes = [];

        //   console.log(JSON.stringify(elemento));
        var id = elemento._id;
        // console.log("id elemento: " + id);

        var dir = __dirname + '/imgs/' + id + '/';
        console.log("Directorio destino: " + dir);
        var keysImagenes = [];
        for (var key in files) {
            keysImagenes.push(key);
        }
        var i = 0;
        console.log(keysImagenes);
        app.async.each(keysImagenes, function (listItem, next) {

            listItem.position = i;

            console.log("list-item: " + listItem);
            console.log("length: " + keysImagenes.length);
            subirFichero(files[listItem], dir, id).then(function (data) {
                elemento._id = new mongodb.ObjectId(id);

                // Si es la imagen principal lo tratamos de forma diferente
                var principal = false;
                if (listItem.includes(filePrincipal)) {
                    principal = true;
                }

                if (!principal) {
                    var imagen = {};
                    imagen.name = data;

                    if (!elemento.imagenes) {
                        elemento.imagenes = [];
                    }
                    elemento.imagenes.push(imagen);
                } else {
                    var imagenPrincipal = data;
                    elemento.imagenPrincipal = imagenPrincipal;

                }

                //Actualizamos en bd el elemento y pasamos al siguiente elemento para procesar de forma asincrona
                return elementosData.updating(elemento, {
                    _id: new mongodb.ObjectId(id)
                })

            }).then(function (data) {
                console.log("Exito en: " + data);
            }).fail(function (err) {
                console.log('Error actualiando' + name);
                res.status(500).send(err)
            });

        });

        res.status(200).send(elemento);

    });

    function subirFichero(sampleFile, dir, id) {
        var deferred = Q.defer();
        app.mkdirp(dir, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(sampleFile.name);
                var name = makeid() + '_' + sampleFile.name;
                console.log(name);
                var pathToFile = dir + name;
                sampleFile.mv(pathToFile,
                    function (err) {
                        if (err) {
                            callback2Promise(err, data, deferred);
                            res.status(500).send(err);
                        } else {
                            app.gm(pathToFile)
                                .resize(172, 261, '!')
                                .gravity('center')
                                .extent(172, 261)
                                .write(dir + '_' + 'preview' + '_' + name, function (err) {

                                    callback2Promise(err, name, deferred);

                                });
                        }
                    });
            }
        });
        return deferred.promise;
    }

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function callback2Promise(err, result, deferred) {
        if (err) {
            console.error(err);
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    }
}
