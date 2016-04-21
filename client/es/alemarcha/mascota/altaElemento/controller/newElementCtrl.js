(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('NewElementCtrl', newElementCtrl);

    newElementCtrl.$inject = ['$routeParams', 'altaElementoFactory', '$rootScope'];

    function newElementCtrl($routeParams, altaElementoFactory, $rootScope) {
        var vm = this;
        vm.create = create;
        vm.initialize = initialize;
        vm.checkForm = checkForm;
        initialize();

        console.log("empieza creacion");

        function initialize() {
            vm.element = {};
            altaElementoFactory.getTiposMascotas.query(
                function (data) {
                    if (data) {
                        vm.options = data;
                    }
                },
                function (error) {
                    console.log("ERROR");

                });
        }



        function checkForm(form) {
            console.log(form);
            if (form.$valid) {
                create(vm.element);
            }
        }

        function create(element) {
            //console.log("Nombre:"+element.name);
            element.date = new Date();
            element.usuario = $rootScope.usuarioLogged;
            vm.entry = new altaElementoFactory.insertElement();
            vm.entry.element = element;

            vm.entry.$save(function (data) {
                console.log(data);
                $rootScope.indexNotificacion++;
                $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha añadiddo correctamente " + element.name;
            });
            initialize();

        }
    }


}());
