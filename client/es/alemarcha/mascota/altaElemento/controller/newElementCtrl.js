(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('NewElementCtrl', newElementCtrl);
    
    newElementCtrl.$inject = ['$routeParams', 'altaElementoFactory','$rootScope'];
    
    function newElementCtrl ($routeParams, altaElementoFactory, $rootScope) {
        var vm = this;
        vm.create=create;
        vm.initialize=initialize;
        vm.checkForm=checkForm;
        initialize();
        
        console.log("empieza creacion");
        function initialize(){
            vm.element={};
           // vm.element.name="perro";
           // vm.element.description="description";
           // vm.element.address="Direccion";
           // vm.element.city="ciudad";
           // vm.element.cp=41500;
           // vm.element.email="alemarcha26@gmail.com";
           // vm.element.phone="955619720";
        }

        function checkForm(form){
          console.log(form);
          if(form.$valid){
            create(vm.element);
          }
        }

        function create(element){
            console.log("Nombre:"+element.name);
            vm.entry = new altaElementoFactory.insertElement();
            vm.entry.element= element;
            
             vm.entry.$save(function(data){
                console.log(data);
                $rootScope.indexNotificacion++;
                $rootScope.notifications[$rootScope.indexNotificacion++]="Se ha añadiddo correctamente " + element.name;
             });
            initialize();

        }
    }
    
    
}());