(function () {
    
    angular
        .module('adoptaTuMascotaApp')
        .factory('authFactory', authFactory);
    
    authFactory.$inject=['$rootScope'];
    
	 function authFactory ($rootScope)  {
    
        var factory={};
        
    factory.checkPermission = function(){
        if($rootScope.auth){ 
                //Do something
                alert("ok");
                
            }else{
                $location.path('/');    //redirect user to home.
                alert("You don't have access here");
            }             //returns the users permission level 
        
        return $rootScope.auth;
    }
    
        return factory;
    }
    
	
}());