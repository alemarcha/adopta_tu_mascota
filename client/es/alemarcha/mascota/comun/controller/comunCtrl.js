
 (function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('ComunCtrl', comunCtrl);
 comunCtrl.$inject = ['altaElementoFactory', '$rootScope', 'comunService'];

function comunCtrl(altaElementoFactory, $rootScope, comunService) {

    var vm = this;
    vm.filterByProvincia = filterByProvincia;
    initialize();
    function initialize() {
        altaElementoFactory.getProvincias.query(
                function (data) {
                    if (data) {
                        vm.provincias = data;
                    }
                },
                function (error) {
                    console.log("ERROR");

                });
        altaElementoFactory.getTiposMascotas.query(
                function (data) {
                    if (data) {
                        vm.optionsTypeMascotas = data;
                    }
                },
                function (error) {
                    console.log("ERROR");

                });
     }
    
    function filterByProvincia(controller){
         localidades = comunService.filterByProvincia(controller);
             if (localidades!=null && localidades.length > 0){
                controller.municipios = localidades;
             }

    }
}
           

}());  

