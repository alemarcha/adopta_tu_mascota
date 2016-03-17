(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('CentralCtrl', centralCtrl);
    
    centralCtrl.$inject = ['$routeParams', 'centralFactory', '$auth'];

    function centralCtrl($routeParams, centralFactory, $auth) {
        var vm = this;
        vm.pageChangeHandler = pageChangeHandler;

        initialize();

        function initialize () {
            vm.currentPage = 1;
            vm.pageSize = 10;
            vm.numElementInitial = (vm.currentPage * vm.pageSize)- vm.pageSize + 1;
            vm.numElementFinal = (vm.currentPage * vm.pageSize);
            
            centralFactory.numTotalElements.query().$promise
                .then(function(data){
                console.log("exito");
                vm.numTotalElements = data.numTotal;
                console.log('Numero total de elementos:' + data.numTotal);
            },function(err){
                                       console.log("error");                           
                                                                  });

            centralFactory.paginationElements.query({fromPage:vm.currentPage,numElements:vm.pageSize},function(data){
                console.log(data.elementos);
                vm.items=data.elementos;
            }); 
        }
        
        
        function pageChangeHandler(num) {
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
}());