var Q = require('q');
var mongodb = require('./mongodb.js');
var mongoCol = "mascotas";


exports.findAllEnabled = function () {
    return mongodb.finding(mongoCol);
}

exports.inserting = function (mascota) {
    return mongodb.inserting(mongoCol, mascota);
}

exports.counting = function () {
    return mongodb.counting(mongoCol);
}