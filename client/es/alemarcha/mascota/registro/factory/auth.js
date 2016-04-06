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
                                        {query: {cache:false}});
         
    factory.isAuthenticated = function  () {
        console.log("autenticando");
           // Con esto se comprueba que existe token en localStorage. Si no existe directamente no está logueado. Si existe hay que                     comprobar si el token es correcto
           
         if($auth.isAuthenticated()){
                if(!$rootScope.usuarioLogged){
                    //Consulta para obtener usuario a partir del token, solo si no existe el usuario ya
                    //alert($auth.getToken());
                    $rootScope.usuarioLogged;
            factory.getUserByToken.query().$promise
                .then(function(data){
                if(data){
                    alert("exito");
                    $rootScope.usuarioLogged=data;
                    $rootScope.auth=true;    
                    console.log("Usuario: "+JSON.stringify(data));
                }else{
                    eliminaVariablesLogueoSession();
                }
                
                
            },function(err){
                eliminaVariablesLogueoSession();
                alert("NO exito");
                console.log("error num total");                                                                   
            }).catch(function(response) {
                    // Si ha habido errores durante el registro del usuario, llegaremos a esta función
                     $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha producido un error. Inténtelo más tarde.";
                });     
            }else{
                $rootScope.auth=true;
                alert("no se hace nada porque ya existe");
            }
     }else{
         eliminaVariablesLogueoSession();
     }
    }
    
    function eliminaVariablesLogueoSession(){
        $rootScope.auth=false;
         delete $rootScope.usuarioLogged;
    }
    
        return factory;
    }
    
    
    
    
    
    
	
}());