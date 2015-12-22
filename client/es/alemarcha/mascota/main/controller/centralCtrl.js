(function () {
    var centralCtrl = function ($scope, $routeParams, $http) {
        //var urlBase = "http://localhost:3000/api/";
        var vm = this;
        vm.usuario = {};
        vm.items=[{}];
        
        for (var i = 1; i < 10; i++) {
            vm.items.push({ 
                "id" : "id"+i,
                "titulo" : "Titulo"+ i,
                "valor"  : i
            });
        }
    }
    angular.module('adoptaTuMascotaApp').controller('CentralCtrl', centralCtrl);
}());