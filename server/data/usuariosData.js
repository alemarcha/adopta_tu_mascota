var Q = require('q');
var mongodb = require('./mongodb.js');
var mongoCol = "usuarios";


exports.findingByEmailPassword = function (email, password) {
    return mongodb.finding(mongoCol, {
        email: email,
        password: password
    });
}

exports.inserting = function (usuario) {
    return mongodb.inserting(mongoCol, usuario);
}