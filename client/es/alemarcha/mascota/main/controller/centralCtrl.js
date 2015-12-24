(function () {
    var centralCtrl = function ($scope, $routeParams, centralFactory) {
        var vm = this;
        vm.usuario = {};
        var value=centralFactory.query(function(){
            console.log(value);
            vm.items=value.elementos;
        });   
    }
    angular.module('adoptaTuMascotaApp').controller('CentralCtrl', centralCtrl);
}());