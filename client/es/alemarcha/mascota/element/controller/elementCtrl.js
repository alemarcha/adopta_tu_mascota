(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('ElementCtrl', elementCtrl);

    elementCtrl.$inject = ['$routeParams', 'elementFactory', 'elementService','CONSTANTS'];

    function elementCtrl($routeParams, elementFactory, elementService, CONSTANTS) {
        var vm = this;
        vm.id = $routeParams.id;
        console.log(vm.id);

        initialize();

        console.log("empieza");

        function initialize() {
            // Seteamos el timezone por defecto
            moment.tz.setDefault("UTC");
            vm.images = [];


            elementFactory.elementById.query({
                    id: vm.id
                }, function (data) {
                    if (data) {
                        vm.elementoActual = data;

                        // Cogemos el locale del navegador para poner el texto
                        moment.locale(window.navigator.userLanguage || window.navigator.language);
                        var testDateUtc = moment.utc(data.date);
                        if(testDateUtc) {
                            // Cogemos el date de BD en timezone UTC y lo convertimos a la hora local. Usamos la libreria jstz para obtener el timezone del browser.
                            vm.fromNow = testDateUtc.tz(jstz.determine().name()).fromNow();
                            vm.dateFormat = testDateUtc.tz(jstz.determine().name()).format(CONSTANTS.DATE_FORMAT);
                        }

                        // Añadimos las imagenes con la ruta correcta tanto la principal como las preview con su ruta original

                        if (vm.elementoActual.imagenPrincipal) {
                            vm.images.push({
                                thumb: '/imgs/' + vm.id + '/_preview_' + vm.elementoActual.imagenPrincipal,
                                img: '/imgs/' + vm.id + '/' + vm.elementoActual.imagenPrincipal
                            });
                        }
                        for (var i in vm.elementoActual.imagenes) {
                            vm.images.push({
                                thumb: '/imgs/' + vm.id + '/_preview_' + vm.elementoActual.imagenes[i].name,
                                img: '/imgs/' + vm.id + '/' + vm.elementoActual.imagenes[i].name
                            });
                        }

                    } else {

                    }
                },
                function (error) {
                    console.log("ERROR");

                });
        }
    }


}());

// HAY QUE HACER FUNCIONAR BIEN LA HORA CON EL TIMEZONE SEGUN LAS ZONA EN LA QUE ESTES
