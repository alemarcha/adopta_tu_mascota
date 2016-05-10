(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('NewElementCtrl', newElementCtrl);

    newElementCtrl.$inject = ['$routeParams', 'altaElementoFactory', '$rootScope', 'Upload'];

    function newElementCtrl($routeParams, altaElementoFactory, $rootScope, Upload) {
        var vm = this;
        vm.create = create;
        vm.initialize = initialize;
        vm.checkForm = checkForm;
        vm.upload = upload;
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
                //console.log(JSON.stringify(data.element));
                console.log("Id nuevo elemento" + data._id);
                upload(vm.images, data._id);
                vm.images.remove;
            });


            initialize();

        }

        function upload(files, id) {
            console.log("upload id" + id);
            Upload.upload({
                url: '/api/priv/element/upload',
                data: {
                    id: id,
                    files: files
                },
            }).then(function (response) {
                vm.images = [];
                console.log("Subido");
            }, function (response) {
                console.log("NO SUBIDO");
            }, function (evt) {
                console.log("NO SUBIDO 2" + evt);
            });
        }
    }


}());
