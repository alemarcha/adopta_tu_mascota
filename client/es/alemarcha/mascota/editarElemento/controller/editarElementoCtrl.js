(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('EditarElementoCtrl', editarElementoCtrl);

    editarElementoCtrl.$inject = ['$routeParams', 'altaElementoFactory', '$rootScope', 'Upload', 'editarElementoFactory'
        , 'elementService', 'elementFactory', '$http','$location', 'comunService','$scope'];

    function editarElementoCtrl($routeParams, altaElementoFactory, $rootScope, Upload, editarElementoFactory, elementService, elementFactory, $http, $location, comunService, $scope) {
        var vm = this;
        alert($rootScope.permiso_acceso_restringido);
        vm.id = $routeParams.id;
        //vm.create = create;
        vm.initialize = initialize;
        vm.checkForm = checkForm;
        //vm.upload = upload;
        initialize();

        console.log($scope.accommodation);

        function initialize() {
            vm.otrasImagenesActual = [];
        
            elementFactory.elementById.query({
                    id: vm.id
                }, function (data) {
                    if (data) {
                        vm.element = data;
                        for (var i in vm.element.imagenes) {
                            vm.otrasImagenesActual.push({
                                thumb: '/imgs/' + vm.id + '/_preview_' + vm.element.imagenes[i].name,
                                img: '/imgs/' + vm.id + '/' + vm.element.imagenes[i].name
                            });
                        }

                        comunService.filterByProvincia(vm);
                    } else {
                        $location('404');
                    }
                },
                function (error) {
                    console.log("ERROR");

                });

        }

        function checkForm(form) {
            console.log(form);
            if (form.$valid) {
                edit(vm.element);
            }
        }


        function edit(element) {
            //console.log("Nombre:"+element.name);
            element.date_modificacion = new Date();
            vm.entry = new altaElementoFactory.insertElement();
            vm.entry.element = element;
            vm.entry._id = element._id;

            vm.entry.$update(function (data) {
                console.log(data);
                $rootScope.indexNotificacion++;
                $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha editado correctamente " + element.name;
                //console.log(JSON.stringify(data.element));
                console.log("Id nuevo elemento" + JSON.parse(JSON.stringify(data)));
                if (vm.images || vm.imagePrincipal) {
                    upload(vm.images, vm.imagePrincipal, element);
                }
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
                alert("Subido");
                $location.url('/element/'+vm.id);

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
