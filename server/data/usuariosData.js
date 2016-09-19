var Q = require('q');
var mongodb = require('./mongodb.js');
var mongoCol = "usuarios";


exports.findingByEmailPassword = function (email, password) {
    return mongodb.finding(mongoCol, {
        email: email,
        password: password
    });
}

exports.find = function (query) {
    return mongodb.finding(mongoCol, query);
}

exports.inserting = function (usuario) {
    return mongodb.inserting(mongoCol, usuario);
}

exports.updating = function (usuario, query, fields) {
    return mongodb.updating(mongoCol, query, fields);
}