var Q = require('q');
var mongodb = require('./mongodb.js');
var mongoCol = "mascotas";


exports.findAllEnabled = function (query, skip, limit, sortby) {
    return mongodb.findingAllEnabled(mongoCol, query, skip, limit, sortby);
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

exports.counting = function () {
    return mongodb.counting(mongoCol);
}

exports.updating = function (mascota, query) {
    return mongodb.updating(mongoCol, query, mascota);
}
