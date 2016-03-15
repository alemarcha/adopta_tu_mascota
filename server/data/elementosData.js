var Q = require('q');
var mongodb = require('./mongodb.js');
var mongoCol = "mascotas";


exports.findAllEnabled = function () {
    return mongodb.finding(mongoCol, {
        state: 1
    });
}

exports.inserting = function (mascota) {
    return mongodb.inserting(mongoCol, mascota);
}