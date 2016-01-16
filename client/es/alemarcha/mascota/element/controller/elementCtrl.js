(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('ElementCtrl', elementCtrl);
    
    elementCtrl.$inject = ['$routeParams', 'elementFactory'];
    
    function elementCtrl ($routeParams, elementFactory) {
        var vm = this;
        vm.id=$routeParams.id;
        console.log(vm.id);
        
        initialize();
        
        console.log("empieza");
        function initialize(){
         elementFactory.elementById.query({id:vm.id},function(data){
            vm.elementoActual=data;
            console.log(vm.elementoActual.titulo);
             console.log("aqui");
        },function(error){
             console.log("ERROR");
             
         }); 
        }
    }
    
    
}());