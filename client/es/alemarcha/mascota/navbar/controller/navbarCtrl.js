(function () {
    angular
    .module('adoptaTuMascotaApp')
    .controller('NavBarCtrl', navBarCtrl);
    
    navBarCtrl.$inject = ['$rootScope', '$auth'];
    
    function navBarCtrl($rootScope, $auth) {
       this.isAuthenticated = function() {
        console.log("autenticando");
           // Con esto se comprueba que existe token en localStorage. Si no existe directamente no está logueado. Si existe hay que                     comprobar si el token es correcto
           $rootScope.auth=false;
         if($auth.isAuthenticated()){
                if(!$rootScope.usuarioLogged){
                    //Consulta para obtener usuario a partir del token, solo si no existe el usuario ya
                    $auth.usuarioLogged={"email":"aa","nombre":"fasfd"};
                }
             $rootScope.auth=true;
             return true;
        }else{
                delete $rootScope.usuarioLoggedn;
        }
                
           return false;
                 
             
     };
            
     
    }
    
}());