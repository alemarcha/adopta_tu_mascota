(function () {
    angular
    .module('adoptaTuMascotaApp')
    .controller('NavBarCtrl', navBarCtrl);
    
    navBarCtrl.$inject = ['$rootScope', '$auth'];
    
    function navBarCtrl($rootScope, $auth) {
       this.isAuthenticated = function() {
        console.log("autenticando");
           // Con esto se comprueba que existe token en localStorage. Si no existe directamente no está logueado. Si existe hay que                     comprobar si el token es correcto
         if($auth.isAuthenticated()){
                $rootScope.auth=true;
             return true;
             }else{
                
                 return false;
             }
     };
            
     
    }
    
}());