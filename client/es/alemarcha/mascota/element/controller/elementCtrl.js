(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('ElementCtrl', elementCtrl);

    elementCtrl.$inject = ['$routeParams', 'elementFactory', 'moment'];

    function elementCtrl($routeParams, elementFactory) {
        var vm = this;
        vm.id = $routeParams.id;
        console.log(vm.id);

        initialize();

        console.log("empieza");

        function initialize() {
            // Seteamos el timezone por defecto
            moment.tz.setDefault("UTC");


            elementFactory.elementById.query({
                    id: vm.id
                }, function (data) {
                    if (data) {
                        vm.elementoActual = data;

                        // Cogemos el locale del navegador para poner el texto
                        moment.locale(window.navigator.userLanguage || window.navigator.language);
                        var testDateUtc = moment.utc(data.date);
                        // Cogemos el date de BD en timezone UTC y lo convertimos a la hora local. Usamos la libreria jstz para obtener el timezone del browser.
                        vm.elementoActual.fromNow = testDateUtc.tz(jstz.determine().name()).fromNow();
                        vm.elementoActual.dateFormat = testDateUtc.tz(jstz.determine().name()).format('DD/MM/YYYY HH:mm:ss');
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
