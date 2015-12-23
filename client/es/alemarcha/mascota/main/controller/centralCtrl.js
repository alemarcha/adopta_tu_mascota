(function () {
    var centralCtrl = function ($scope, $routeParams, $http, $resource) {
        //var urlBase = "http://localhost:3000/api/";
        var vm = this;
        vm.usuario = {};
        vm.items =  function ($resource)  {
            alert($resource);
        return $resource("/api/pub/elements/",{},{get: {cache: true}});
    };
        alert("alercja");
        
       
    }
    angular.module('adoptaTuMascotaApp').controller('CentralCtrl', centralCtrl);
}());