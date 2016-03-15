var usuariosData = require('./data/usuariosData.js')
module.exports.service_auth = function (app) {     
    function createJWT(user) {
      var payload = {
        sub: user._id,
        iat: app.moment().unix(),
        exp: app.moment().add(14, 'days').unix()
      };
      return app.jwt.encode(payload, app.token_secret);
    }
    
	app.post('/api/auth/login', function (req, res, next) {
		var element = req.body.email;
        var pass = req.body.password;
        console.log("LOGIN SERVER" + element);
        var user = {email:element};

        usuariosData.findingByEmailPassword(element,pass)
                .then(function (data) {
                    if (data && data.length==1) {
                        console.log('email logueado:' + JSON.stringify(data));
                        res.send({ token: createJWT(user) });
                    } else {
                        console.log('Email/contraseña no existe:' +JSON.stringify(data));
                        
                        res.status(401).send(data);
                    };
                })
                .fail(function (err) {
                    console.log('fallog' + err);
                    res.status(500).send(err)
                });
        
	});

    app.post('/api/private/auth/register', function (req, res, next) {
        var element = req.body.usuario;

        console.log("REGISTER SERVER" + element);
        var user = {email:element.email};
        usuariosData.inserting(element)
                .then(function (data) {
                    if (data) {
                        console.log('email registrado:' + JSON.stringify(data));
                        res.send({ token: createJWT(user) });
                    } else {
                        console.log('Email/contraseña no existe:' +data);
                        
                        res.status(401).send(data);
                    };
                })
                .fail(function (err) {
                    console.log('fallog' + err);
                    res.status(500).send(err)
                });
        
    });
    
    app.post('/api/private/auth/logout', function (req, res, next) {
        var fromPage = req.params.fromPage;
        var numElements = req.params.numElements;
        var elemFinal= fromPage * numElements;
        var elemInicial=elemFinal-numElements + 1;
		var itemsRes={elementos:[]};
        
		for (var i = elemInicial; i <= elemFinal; i++) {
            if(app.items.elementos.length<i){
                break;
            }
           itemsRes.elementos.push(app.items.elementos[i-1]);
        }
            
        console.log(itemsRes);
		setTimeout(function (){res.json(itemsRes),2000});
	});
}