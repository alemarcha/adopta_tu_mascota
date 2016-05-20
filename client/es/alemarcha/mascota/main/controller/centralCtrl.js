(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('CentralCtrl', centralCtrl);

    centralCtrl.$inject = ['$routeParams', 'centralFactory', '$auth'];

    function centralCtrl($routeParams, centralFactory, $auth) {
        var vm = this;
        vm.pageChangeHandler = pageChangeHandler;

        initialize();

        function initialize() {
            vm.currentPage = 1;
            vm.pageSize = 10;


            centralFactory.numTotalElements.query().$promise
                .then(function (data) {
                   // console.log("exito");
                    vm.numTotalElements = data.numTotal;
                    if (vm.numTotalElements < vm.pageSize) {
                        vm.pageSize = vm.numTotalElements;
                        vm.numElementInitial = (vm.currentPage * vm.pageSize) - vm.pageSize + 1;
                        vm.numElementFinal = (vm.currentPage * vm.pageSize);
                    }
                    console.log('Numero total de elementos:' + data.numTotal);
                }, function (err) {
                    console.log("error num total");
                });

            pageChangeHandler(vm.currentPage);
        }


        function pageChangeHandler(num) {
          //  console.log('drinks page changed to ' + num);
            vm.currentPage = num;
            vm.numElementInitial = (vm.currentPage * vm.pageSize) - vm.pageSize + 1;
            vm.numElementFinal = (vm.currentPage * vm.pageSize);
            centralFactory.paginationElements.query({
                fromPage: vm.currentPage,
                numElements: vm.pageSize,
                sortby : 'date_creacion'
            }, function (data) {

                //console.log(data);
                vm.items = data.elementos;
                
                vm.numTotalPage = data.numTotalPage;
                // Hacemos esto despues de la consulta, ya que cuando el numero total es menor que multiplo de pageSize y estamos en la última página, solo muestre en el texto pageSize elements
                if (vm.numTotalPage < vm.pageSize) {
                    vm.numElementFinal = vm.numTotalElements;
                }
            });


        };
    }
}());
