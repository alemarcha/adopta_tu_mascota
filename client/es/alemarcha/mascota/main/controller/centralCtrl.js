(function () {
    var centralCtrl = function ($scope, $routeParams, $http, centralFactory) {
        //var urlBase = "http://localhost:3000/api/";
        var vm = this;
        vm.usuario = {};
        var value=centralFactory.query(function(){
            console.log(value);
            vm.items=value.elementos;
        });
        
        
         
        
        alert("alercja");
        
       
    }
    angular.module('adoptaTuMascotaApp').controller('CentralCtrl', centralCtrl);
}());