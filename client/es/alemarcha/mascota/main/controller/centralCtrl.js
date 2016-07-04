(function () {
        angular
            .module('adoptaTuMascotaApp')
            .controller('CentralCtrl', centralCtrl);

        centralCtrl.$inject = ['$routeParams', 'centralFactory', '$auth'];

        function centralCtrl($routeParams, centralFactory, $auth) {
            var vm = this;
            vm.pageChangeHandler = pageChangeHandler;
            vm.addSort = addSort;;

            initialize();

            function initialize() {
                vm.currentPage = 1;
                vm.pageSize = 10;
                vm.dataJson = {};
                vm.dataJson.filter={};
                numTotalElements();
                pageChangeHandler(vm.currentPage);
            }

            function numTotalElements() {
                vm.entry = new centralFactory.numTotalElements();
                vm.entry.element = vm.dataJson;
                vm.entry.$save()
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
            }

            function pageChangeHandler(num) {
                //  console.log('drinks page changed to ' + num);
                vm.currentPage = num;
                vm.numElementInitial = (vm.currentPage * vm.pageSize) - vm.pageSize + 1;
                vm.numElementFinal = (vm.currentPage * vm.pageSize);

                vm.dataJson.fromPage = vm.currentPage;
                vm.dataJson.numElements = vm.pageSize;

                vm.entry = new centralFactory.paginationElements();
                vm.entry.element = vm.dataJson;
                vm.entry.$save(function (data) {

                        //console.log(data);
                        vm.items = data.elementos;

                        vm.numTotalPage = data.numTotalPage;
                        // Hacemos esto despues de la consulta, ya que cuando el numero total es menor que multiplo de pageSize y estamos en la última página, solo muestre en el texto pageSize elements
                        if (vm.numTotalPage < vm.pageSize) {
                            vm.numElementFinal = vm.numTotalElements;
                        }
                    }
                );


            };

            function addSort(){
                vm.currentPage=1;
                filter = {};
                if(vm.orden==1){



                    filter["type.id"] = 1;


                }else if(vm.orden==2){

                    filter["raza"] = 'aaa';
                }

                vm.dataJson.filter = filter;
                numTotalElements();
                pageChangeHandler(vm.currentPage);
            }
        }
    }
    ()
)
;
