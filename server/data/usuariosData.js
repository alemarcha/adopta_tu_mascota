var Q = require('q');
var mongodb = require('./mongodb.js')
var mongoCol = "Usuarios"

exports.gettingByEmail = function (usuario) {
    var deferred = Q.defer();
    mongodb.connecting(mongoCol)
        .then(function (colDb) {
            colDb.find({
                usuario: usuario
            }).toArray(function (err, result) {
                if (err) {
                    mongodb.rejectOnError(deferred, err);
                } else {
                    deferred.resolve(result[0]);
                }
            });
        })
        .fail(function (err) {
            mongodb.rejectOnError(deferred, err);
        });
    return deferred.promise;
}