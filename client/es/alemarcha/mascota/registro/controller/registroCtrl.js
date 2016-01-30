(function () {
    angular
    .module('adoptaTuMascotaApp')
    .controller('RegistroCtrl', registroCtrl);
    
    registroCtrl.$inject = ['$routeParams','$auth','$location'];
    
    function registroCtrl($routeParams, $auth, $location) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        
        initialize();

        function initialize () {
            vm.usuario = {};
        }
            
        function login () {
            
            console.log($auth.getToken());
            $auth.login({
                email: vm.usuario.email,
                password: vm.usuario.password
            })
            .then(function(response) {
                // Redirect user here after a successful log in.
                $auth.setToken("alexis");
            })
            .catch(function(response) {
                // Handle errors here, such as displaying a notification
                // for invalid email and/or password.
            });
        }
        
        function register () {
            $auth.signup({
                email: vm.usuario.email,
                password: vm.usuario.password
            })
            .then(function() {
                // Si se ha registrado correctamente,
                // Podemos redirigirle a otra parte
                $location.url('/');
            })
            .catch(function(response) {
                // Si ha habido errores, llegaremos a esta función
            });   
        }
    }
    
}());