(function () {
    angular
    .module('adoptaTuMascotaApp')
    .controller('NavBarCtrl', navBarCtrl);
    
    navBarCtrl.$inject = ['$scope', '$auth'];
    
    function navBarCtrl($scope, $auth) {
       this.isAuthenticated = function() {
        console.log("autenticando");
         return $auth.isAuthenticated();
     };
            
     
    }
    
}());