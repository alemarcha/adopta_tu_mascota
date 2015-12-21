(function () {
    var centralCtrl = function ($scope, $routeParams, $http) {
        //var urlBase = "http://localhost:3000/api/";
        var vm = this;
        vm.usuario = {};
        vm.entrar = function () {
                    $scope.nombre = vm.usuario.email;
                    $scope.mensaje = 'recién entrado';
                    alert("hola");
                
        }
    }
    angular.module('adoptaTuMascotaApp').controller('CentralCtrl', centralCtrl);
}());