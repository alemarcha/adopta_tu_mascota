module.exports.configApp = function () {

    var express = require('express');
    var bodyParser = require('body-parser');
    var jwt = require('jwt-simple');
    var moment = require('moment');
    var fileUpload = require('express-fileupload');
    var mkdirp = require('mkdirp');

    var TOKEN_SECRET = process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET';

    var app = express();
    app.jwt = jwt;
    app.moment = moment;
    app.token_secret = TOKEN_SECRET;
    app.mkdirp = mkdirp;

    app.use(bodyParser());
    app.use(fileUpload());
    app.use(express.static(__dirname + './../client/es/alemarcha/mascota'));
    app.use('/bower_components', express.static(__dirname + './../bower_components'));

    return app;

}
