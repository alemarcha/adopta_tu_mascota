(function () {
    var provinciasData = require('../data/provinciasData.js')
    var mongodb = require('../data/mongodb.js');
    var fs = require("fs");

    var content = fs.readFileSync("/Users/alemarcha26/Downloads/ej3.json");

    var json = JSON.parse(content);
    var idProvincia = 0;
    json.lista.provincia.forEach(function(provincia){
        var idMunicipio = 0;
        idProvincia++;
        //if(provincia._id === "51"){
        var jsonToInsert = {};


        //console.log("Provincia: " +  provincia.nombre.__cdata);
        jsonToInsert.provincia = provincia.nombre.__cdata;
        jsonToInsert.identificador = idProvincia;
        jsonToInsert.localidades = [];
        var localidades = provincia.localidades.localidad;
        var isArray = Array.isArray(localidades);
        var localidadJson = {};
        if (isArray) {
            localidades.forEach(function (localidad) {
                idMunicipio++;
                localidadJson = {};
                // console.log("Localidad: " +  localidad.__cdata);

                localidadJson.nombre = localidad.__cdata;
                localidadJson.identificador = idMunicipio;
                jsonToInsert.localidades.push(localidadJson);
            });
        } else {
            if (provincia.localidades.localidad != null) {
                idMunicipio++;
                // console.log("Localidad: " +  provincia.localidades.localidad.__cdata);
                localidadJson.nombre = provincia.localidades.localidad.__cdata;
                localidadJson.identificador = idMunicipio;
                jsonToInsert.localidades.push(localidadJson);
            }
        }

        var objectid = new mongodb.ObjectId();
        console.log("id: " + objectid + " Provincia: " + provincia.nombre.__cdata);
        jsonToInsert._id = objectid;
        provinciasData.inserting(jsonToInsert).then(function(data){
            console.log("fin insercion ");
        });



        //}
    });
    console.log("Fin");


//console.log(JSON.stringify(datos));

}());

