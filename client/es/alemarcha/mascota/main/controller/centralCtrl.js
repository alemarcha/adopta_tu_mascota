(function () {
    
    
    var centralCtrl = function ($scope, $routeParams, centralFactory) {
        
  
        var vm = this;
        vm.currentPage = 1;
        vm.pageSize = 5;
        vm.usuario = {};
        var value=centralFactory.query(function(){
            console.log(value);
            vm.items=value.elementos;
        });   
        
        vm.pageChangeHandler = function(num) {
            console.log('drinks page changed to ' + num);
        };
    }
    

    angular.module('adoptaTuMascotaApp').controller('CentralCtrl', centralCtrl);
}());