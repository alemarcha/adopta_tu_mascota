(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('NewElementCtrl', newElementCtrl);
    
    elementCtrl.$inject = ['$routeParams', 'elementFactory'];
    
    function newElementCtrl ($routeParams, elementFactory) {
        var vm = this;
    
        initialize();
        
        console.log("empieza");
        function initialize(){
        
        }
    }
    
    
}());