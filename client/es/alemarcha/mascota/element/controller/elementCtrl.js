(function () {
    function elementCtrl ($scope, $routeParams, $http) {
        var vm = this;
        
        vm.id=$routeParams.id;
        
        console.log(vm.id);
        alert(vm.id);
        
        
    }
    angular.module('adoptaTuMascotaApp').controller('ElementCtrl', elementCtrl);
}());