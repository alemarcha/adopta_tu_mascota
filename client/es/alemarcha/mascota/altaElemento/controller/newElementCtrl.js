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
            element.date_creacion = new Date();
            element.usuario = $rootScope.usuarioLogged;
            vm.entry = new altaElementoFactory.insertElement();
            vm.entry.element = element;


            vm.entry.$save(function (data) {
                console.log(data);
                $rootScope.indexNotificacion++;
                $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha añadiddo correctamente " + element.name;
                //console.log(JSON.stringify(data.element));
                console.log("Id nuevo elemento" + JSON.parse(JSON.stringify(data)));
                upload(vm.images, vm.imagePrincipal, data);
            });
        }

        function upload(files, filePrincipal, elemento) {
            //console.log("upload id" + id);
            Upload.upload({
                url: '/api/priv/element/upload',
                data: {
                    files: files,
                    filePrincipal: filePrincipal,
                    principal: 'filePrincipal',
                    info: Upload.json(elemento)
                },
            }).then(function (response) {
                vm.images = [];
                vm.imagePrincipal = [];
                initialize();
                console.log("Subido");
            }, function (response) {
                console.log("NO SUBIDO: " + response);
                $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha producido un error al adjuntar las imágenes. Intente añadirlas más tarde. ";
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ');

            });


        }
    }


}());
