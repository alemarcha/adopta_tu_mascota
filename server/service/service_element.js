var elementosData = require('../data/elementosData.js')
module.exports.service_element = function (app) {


    app.get('/api/pub/element/:id', function (req, res, next) {
        //		console.log(req.params.id)
        //		var element = {"precio":111,"titulo":"Elemento"+req.params.id,"descripcion":"Esta es la descripcion de "+req.params.id, "fechaPublicacion":"22/12/2015 22:21:15", "autor":"Usuario "+req.params.id};
        //		if(req.params.id === 'id2'){
        //			res.status(404).send('Sesión caducada');
        //		}else{
        //			setTimeout(function (){res.json(element)},1000);     
        //		}
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
        console.log("Body:" + element.name)



        elementosData.inserting(element)
            .then(function (data) {
                console.log('Creado elemento' + data);
                res.status(200).send();

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
        console.log(__dirname);

        sampleFile = req.files.file;
        sampleFile.mv(__dirname + '/imgs/' + sampleFile.name, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send('File uploaded!');
            }
        });
    });
}
