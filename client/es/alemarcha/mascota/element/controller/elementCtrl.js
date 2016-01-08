(function () {
    function elementCtrl ($scope, $routeParams, $http, elementFactory) {
        var vm = this;
        vm.id=$routeParams.id;
        console.log(vm.id);
        vm.showSpinner=true;
        console.log("empieza");
         var element = elementFactory.elementById.query({id:vm.id},function(){
            vm.showSpinner=false;
             console.log("aqui");
             
        });   
    }
    angular.module('adoptaTuMascotaApp').controller('ElementCtrl', elementCtrl);
}());