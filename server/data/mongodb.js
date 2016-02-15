var Q = require('q');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://85.136.163.125:27017/aappAd0pt0MiMascota";
//mongoCol es una collection
exports.connecting = function (mongoCol) {
    var deferred = Q.defer();
    MongoClient.connect(mongoUrl, function (err, db) {
        if (!err) {
            deferred.resolve(db.collection(mongoCol));
        } else {
            rejectOnError(deferred, err);
        }
    });
    return deferred.promise;
}

exports.ObjectId = 	mongodb.ObjectID;

exports.rejectOnError = rejectOnError;

function rejectOnError(deferred, err) {
    console.error(err);
    deferred.reject(err);

    function inserting(mongoCol, document) {
    var deferred = Q.defer();
    connecting(mongoCol)
        .then(function (colDb) {
            colDb.insert(document, function (err, result) {
                callback2Promise(err, result, deferred);
            });
        })
        .fail(function (err) {
            callback2Promise(err, result, deferred);
        });
    return deferred.promise;
}

function callback2Promise(err, result, deferred) {
    if (err) {
        console.error(err);
        deferred.reject(err);
    } else {
        deferred.resolve(result);
    }
}
}