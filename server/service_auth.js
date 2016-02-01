module.exports.service_auth = function (app) {
    var jwt = require('jwt-simple');
    var moment = require('moment');
     var TOKEN_SECRET = process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET';
    function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, TOKEN_SECRET);
}
    
	app.post('/api/private/auth/login', function (req, res, next) {
		var element = req.body;
        console.log("LOGIN SERVER");
	
        var user = {email:"alemarcha@gmail.com"}
        res.send({ token: createJWT(user) });
	});

    app.post('/api/private/auth/register', function (req, res, next) {
        var total={numTotal:app.items.elementos.length};
        res.json(total);
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