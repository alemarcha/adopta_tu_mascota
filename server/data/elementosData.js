var Q = require('q');
var mongodb = require('./mongodb.js');
var mongoCol = "mascotas";


exports.findAllEnabled = function (skip, limit, sortby, filterby) {
    return mongodb.findingAllEnabled(mongoCol, skip, limit, sortby, filterby);
}

exports.find = function (idElemento) {
    console.log("Buscando elemento 2: " + idElemento);
    return mongodb.finding(mongoCol, {
        _id: new mongodb.ObjectId(idElemento)
    });
}


exports.inserting = function (mascota) {
    return mongodb.inserting(mongoCol, mascota);
}

exports.counting = function (query) {
    return mongodb.counting(mongoCol,query);
}

exports.updating = function (mascota, query) {
    return mongodb.updating(mongoCol, query, mascota);
}
