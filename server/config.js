module.exports.configApp = function () {

    var express = require('express');
    var bodyParser = require('body-parser');
    var jwt = require('jwt-simple');
    var moment = require('moment');
    var fileUpload = require('express-fileupload');
    var mkdirp = require('mkdirp');
    var gm = require('gm');
    var forEach = require('async-foreach').forEach;
    var async = require('async');
    var sha1 = require('sha1');

    var TOKEN_SECRET = process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET';

    var app = express();
    //Here we are configuring express to use body-parser as middle-ware.

    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());


    app.jwt = jwt;
    app.moment = moment;
    app.token_secret = TOKEN_SECRET;
    app.mkdirp = mkdirp;
    app.gm = gm;
    app.forEach = forEach;
    app.async = async;
    app.sha1 = sha1;

    app.use(bodyParser());
    app.use(fileUpload());
    app.use(express.static(__dirname + './../client/es/alemarcha/mascota'));
    app.use('/bower_components', express.static(__dirname + './../bower_components'));
    app.use('/imgs', express.static(__dirname + '/service/imgs'));

    return app;

}
