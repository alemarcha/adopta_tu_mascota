(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('NewElementCtrl', newElementCtrl);
    
    newElementCtrl.$inject = ['$routeParams'];
    
    function newElementCtrl ($routeParams) {
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
            console.log(element.name);
            initialize();
        }
    }
    
    
}());