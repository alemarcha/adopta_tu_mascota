(function () {
    
    
    var centralCtrl = function ($scope, $routeParams, centralFactory) {
        
  
        var vm = this;
        vm.currentPage = 1;
        vm.pageSize = 5;
        vm.usuario = {};
        var value=centralFactory.paginationElements.query({fromPage:vm.currentPage,numElements:vm.pageSize},function(){
            console.log(value);
            vm.items=value.elementos;
        });   
        
        vm.pageChangeHandler = function(num) {
            console.log('drinks page changed to ' + num);
            vm.currentPage=num;
            var value=centralFactory.paginationElements.query({fromPage:vm.currentPage,numElements:vm.pageSize},function(){
            console.log(value);
            vm.items=value.elementos;
        });   
        
        };
    }
    

    angular.module('adoptaTuMascotaApp').controller('CentralCtrl', centralCtrl);
}());