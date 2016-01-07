(function () {
    
    
    var centralCtrl = function ($scope, $routeParams, centralFactory) {
        var vm = this;
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.usuario = {};
        vm.numElementInitial = (vm.currentPage * vm.pageSize)- vm.pageSize + 1;
        vm.numElementFinal = (vm.currentPage * vm.pageSize);
        
        var numTotalElements = centralFactory.numTotalElements.query(function(){
            vm.numTotalElements = numTotalElements.numTotal;
            console.log('Numero total de elementos:' + numTotalElements.numTotal);
        });

        var firstElements = centralFactory.paginationElements.query({fromPage:vm.currentPage,numElements:vm.pageSize},function(){
            console.log(firstElements);
            vm.items=firstElements.elementos;
        });   
        
        vm.pageChangeHandler = function(num) {
            console.log('drinks page changed to ' + num);
            vm.currentPage=num;
            vm.numElementInitial = (vm.currentPage * vm.pageSize)- vm.pageSize + 1;
            vm.numElementFinal = (vm.currentPage * vm.pageSize);
            var value=centralFactory.paginationElements.query({fromPage:vm.currentPage,numElements:vm.pageSize},function(){
                console.log(value);
                vm.items=value.elementos;
             });   
        };

    }
    

    angular.module('adoptaTuMascotaApp').controller('CentralCtrl', centralCtrl);
}());