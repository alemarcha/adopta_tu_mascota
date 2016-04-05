(function () {
    
    angular
        .module('adoptaTuMascotaApp')
        .factory('authFactory', authFactory);
    
    authFactory.$inject=['$rootScope','$resource','$auth','$location'];
    
	 function authFactory ($rootScope,$resource,$auth,$location)  {
    
        var factory={};
        
    factory.checkPermission = function(){
        if($rootScope.auth){ 
                //Do something
                alert("ok");
                
            }else{
                $location.path('/401');    //redirect user to home.
                alert("You don't have access here");
            }             //returns the users permission level 
        
        return $rootScope.auth;
    }
    
    factory.getUserByToken = $resource("/api/private/auth/loginToken",
                                        {},
                                        {query: {cache:true}});
         
    factory.isAuthenticated = function  () {
        console.log("autenticando");
           // Con esto se comprueba que existe token en localStorage. Si no existe directamente no está logueado. Si existe hay que                     comprobar si el token es correcto
           $rootScope.auth=false;
         if($auth.isAuthenticated()){
                if(!$rootScope.usuarioLogged){
                    //Consulta para obtener usuario a partir del token, solo si no existe el usuario ya
                    //alert($auth.getToken());
                    $rootScope.usuarioLogged;
//            authFactory.getUserByToken.query().$promise
//                .then(function(data){
//                console.log("exito");
//            },function(err){
//                console.log("error num total");                           
//                                                              
//            });

            
             $rootScope.auth=true;
             return true;
        }else{
                delete $rootScope.usuarioLogged;
        }
                
           return false;
                 
             
     }
    }
    
    
        return factory;
    }
    
    
    
	
}());