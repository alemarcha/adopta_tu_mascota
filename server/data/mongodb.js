var Q = require('q');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://192.168.1.10:27017/aappAd0pt0MiMascota";

exports.ObjectId = mongodb.ObjectID;
exports.connecting = connecting;
exports.finding = finding;
exports.findingAllEnabled = findingAllEnabled;
exports.inserting = inserting;
exports.updating = updating;
exports.counting = counting;

function connecting(mongoCol) {
    var deferred = Q.defer();
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            callback2Promise(err, null, deferred);
        } else {
            callback2Promise(null, db.collection(mongoCol), deferred);
        }
    });
    return deferred.promise;
}

function finding(mongoCol, query) {
    var deferred = Q.defer();
    console.log("En el finding by id" +  query);
    connecting(mongoCol)
        .then(function (colDb) {
            colDb.find(query).toArray(function (err, result) {
                callback2Promise(err, result, deferred);
                //console.log("En el finding OK" + JSON.stringify(result));
            });
        })
        .fail(function (err) {
            callback2Promise(err, result, deferred);

            //console.log("En el finding fails");
        });
    return deferred.promise;
}

function findingAllEnabled(mongoCol, skip, limit, sortby, filterby, fields) {
    var deferred = Q.defer();
    skip = skip !=null ? skip : 0;
    limit = limit !=null ? limit :0;
    sortby = sortby !=null ? sortby : { $natural: 1 };
    filterby = filterby!=null ? filterby : {};
    fields = fields !=null ? fields : {};
    console.log("En el finding");
    //console.log("Sort2: " + JSON.stringify(sortby));
    connecting(mongoCol)
        .then(function (colDb) {

                console.log('Entrando en el filtro: ' + JSON.stringify(filterby) + ' skip ' + skip + ' sort ' + JSON.stringify( sortby )+ ' limit ' + limit);
                console.log("Consulta: colDb.find("+JSON.stringify(filterby)+").skip("+skip+").limit("+limit+").sort("+JSON.stringify(sortby)+")");
                colDb.find(filterby, fields).limit(limit).sort(sortby).skip(skip).toArray(function (err, result) {
                    callback2Promise(err, result, deferred);
                    //console.log("En el finding OK" + JSON.stringify(result));
                });


        })
        .fail(function (err) {
            callback2Promise(err,null, deferred);

            console.log("En el finding fails", JSON.stringify(err));
        }).catch(function (error) {
            console.log('catch findingall '+ error);
    });
    return deferred.promise;
}


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

function updating(mongoCol, query, document) {
    var deferred = Q.defer();
    connecting(mongoCol)
        .then(function (colDb) {
            colDb.update(query, document, function (err, result) {
                callback2Promise(err, result, deferred);
            });
        })
        .fail(function (err) {
            callback2Promise(err, result, deferred);
        }).catch(function () {
        console.log("catch mongo");
        deferred.reject();

    });
    return deferred.promise;
}

function counting(mongoCol, query) {
    var deferred = Q.defer();

    connecting(mongoCol)
        .then(function (colDb) {
            colDb.count(query, function (err, result) {
                callback2Promise(err, result, deferred);
            });
        })
        .fail(function (err) {
            console.log("fail mongo" + err);
            callback2Promise(err, result, deferred);
        })
        .catch(function () {
            console.log("catch mongo");
            deferred.reject();

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
