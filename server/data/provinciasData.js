var Q = require('q');
var mongodb = require('./mongodb.js');
var mongoCol = "provincias";



exports.findById = function (idElemento) {
    console.log("Buscando elemento 2: " + idElemento);
    return mongodb.finding(mongoCol, {
        _id: new mongodb.ObjectId(idElemento)
    });
}


exports.findAll = function (query, campos) {

    return mongodb.findingAllEnabled(mongoCol, null, null, {provincia:1}, query, campos);
}


exports.inserting = function (provincia) {
    return mongodb.inserting(mongoCol, provincia);
}

exports.counting = function (query) {
    return mongodb.counting(mongoCol,query);
}

exports.updating = function (mascota, query) {
    return mongodb.updating(mongoCol, query, mascota);
}
