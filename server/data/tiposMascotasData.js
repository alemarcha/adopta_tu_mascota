var Q = require('q');
var mongodb = require('./mongodb.js');
var mongoCol = "tipos_mascotas";


exports.findAllEnabled = function () {
    return mongodb.finding(mongoCol);
}
