(function () {
        angular
            .module('adoptaTuMascotaApp')
            .controller('CentralCtrl', centralCtrl);

        centralCtrl.$inject = ['$routeParams', 'centralFactory', '$auth','altaElementoFactory'];

        function centralCtrl($routeParams, centralFactory, $auth, altaElementoFactory) {
            var vm = this;
            vm.pageChangeHandler = pageChangeHandler;
            vm.addFilter = addFilter;
            vm.addSearch = addSearch;

            initialize();

            function initialize() {
                vm.currentPage = 1;
                vm.pageSize = 10;
                vm.dataJson = {};
                vm.dataJson.filter={};
                vm.dataJson.search={};
                altaElementoFactory.getTiposMascotas.query(
                    function (data) {
                        if (data) {
                            vm.options = data;
                        }
                    },
                    function (error) {
                        console.log("ERROR");
                    });

                numTotalElements();

            }

            function numTotalElements() {
                vm.entry = new centralFactory.numTotalElements();
                vm.pageSize = 10;
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
                        pageChangeHandler(vm.currentPage);
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
                vm.dataJson.sortby = "date_creacion";

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

            function addFilter(){
                vm.currentPage=1;
                var filter = {};
                if(vm.filtro){
                    if(vm.filtro.id){
                        filter["type.id"] = vm.filtro.id;

                    }
                }
                vm.dataJson.filter = filter;
                numTotalElements();
            }

            function addSearch(){
                vm.currentPage=1;
                vm.dataJson.search = vm.search;
                numTotalElements();

            }
        }
    }
    ()
)
;
