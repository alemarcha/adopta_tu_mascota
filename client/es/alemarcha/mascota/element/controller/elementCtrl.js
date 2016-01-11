(function () {
    function elementCtrl ($scope,$rootScope, $routeParams, $http, elementFactory) {
        var vm = this;
        vm.id=$routeParams.id;
        console.log(vm.id);
        
        
        console.log("empieza");
         var element = elementFactory.elementById.query({id:vm.id},function(){
            vm.elementoActual=element;
            console.log(vm.elementoActual.titulo);
             console.log("aqui");
        },function(){
             console.log("ERROR");
             
         });   
    }
    
    
    angular.module('adoptaTuMascotaApp').controller('ElementCtrl', elementCtrl);
}());