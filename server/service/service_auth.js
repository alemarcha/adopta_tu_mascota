var usuariosData = require('../data/usuariosData.js')
var mongodb = require('../data/mongodb.js');
module.exports.service_auth = function (app) {
    function createJWT(user) {
        var payload = {
            sub: user._id,
            iat: app.moment().unix(),
            exp: app.moment().add(1, 'days').unix()
        };
        return app.jwt.encode(payload, app.token_secret);
    }

    app.post('/api/pub/auth/login', function (req, res, next) {
        var resJson = {response : '' , code: 200 ,msg : "OK"};
        var element = req.body.email;
        var pass = app.sha1(req.body.password);


        console.log("LOGIN SERVER");

        usuariosData.findingByEmailPassword(element, pass)
            .then(function (data) {
                if (data && data.length == 1) {
                   // console.log('email logueado:' + JSON.stringify(data));
                    resJson.response = {
                        token: createJWT(data[0])
                    };

                    res.send(resJson);
                } else {
                   // console.log('Email/contraseña no existe:' + JSON.stringify(data));
                    resJson.response = data
                    resJson.code = 401;
                    resJson.msg = 'Email/contraseña no existe'
                    res.status(401).send(data);
                };
            })
            .fail(function (err) {
               // console.log('fallog' + err);
                resJson.response = ''
                resJson.code = 500;
                resJson.msg = 'Error 500';
                res.status(500).send(resJson)
            });

    });

    app.get('/api/private/auth/loginToken', function (req, res, next) {
        console.log("login token SERVER" );
        var resJson = {response : '' , code: 200 ,msg : "OK"};
        var token = req.headers.authorization.split(" ")[1];
        var payload = app.jwt.decode(token, app.token_secret);
        var id = payload.sub

        usuariosData.find({
                _id: new mongodb.ObjectId(id)
            })
            .then(function (data) {
                if (data && data.length == 1) {
                    //console.log('Usuario token:' + JSON.stringify(data));
                    resJson.response = data[0];
                    res.status(200).send(resJson);
                } else {
                   // console.log('Email/contraseña no existe:' + JSON.stringify(data));
                    resJson.response = data
                    resJson.code = 401;
                    resJson.msg = 'Email/contraseña no existe'
                    res.status(401).send(resJson);
                };
            })
            .fail(function (err) {
                //console.log('fallog' + err);
                resJson.response = ''
                resJson.code = 500;
                resJson.msg = 'Error 500';
                res.status(500).send(resJson)
            });

    });

    app.post('/api/pub/auth/register', function (req, res, next) {
        console.log("REGISTER SERVER");
        var resJson = {response : '' , code: 200 ,msg : "OK"};
        var element = req.body.usuario;
        //console.log ("element" + JSON.stringify(element));
        usuariosData.find({email:element.email}).then(function(data){
            console.log("dataaa" + JSON.stringify(data));
            if(data == null || (data!=null && data.length == 0)){
                element.password = app.sha1(element.password);
                usuariosData.inserting(element)
                    .then(function (data) {
                        if (data) {
                            console.log('email registrado:' + JSON.stringify(data));
                            resJson.response = {
                                token: createJWT(data.ops[0])
                            };
                            res.send(resJson);
                        } else {
                            //console.log('Email/contraseña no existe:' + data);
                            resJson.response = data;
                            res.status(401).send(data);
                        };
                    })
                    .fail(function (err) {
                        //console.log('fallog' + err);
                        resJson.response = ''
                        resJson.code = 500;
                        resJson.msg = 'Error 500';
                        res.status(500).send(err)
                    });
            }else{
                //console.log ("Existeeeeeeeeeeeeeeeeeeeeeee"+JSON.stringify(data));
                resJson.response = '';
                resJson.code = -1;
                resJson.msg = "El email ya existe"
                res.send(resJson);
            }

        });
        
    });
}
