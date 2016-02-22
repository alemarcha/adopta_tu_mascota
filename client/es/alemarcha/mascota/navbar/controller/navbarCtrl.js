(function () {
    angular
    .module('adoptaTuMascotaApp')
    .controller('NavBarCtrl', navBarCtrl);
    
    navBarCtrl.$inject = ['$scope', '$auth'];
    
    function navBarCtrl($scope, $auth) {
       $scope.isAuthenticated = function() {
        alert("autenticando");
         return $auth.isAuthenticated();
     };
            
     
    }
    
}());