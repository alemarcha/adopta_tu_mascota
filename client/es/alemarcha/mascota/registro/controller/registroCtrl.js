(function () {
    angular
    .module('adoptaTuMascotaApp')
    .controller('RegistroCtrl', registroCtrl);
    
    registroCtrl.$inject = ['$routeParams','$auth','$location', 'SatellizerConfig','$rootScope'];
    
    function registroCtrl($routeParams, $auth, $location, config,$rootScope) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        
        initialize();

        function initialize () {
            vm.usuario = {};
            //alert($auth.getToken());
        }
            
        function login () {
            
            console.log($auth.getToken());
            $auth.login({
                email: vm.usuario.email,
                password: vm.usuario.password
            })
            .then(function(response) {
                // Redirect user here after a successful log in.+
                if(response && response.data){
                 var token = response.data[config.tokenName];
                 //alert(response.data[config.tokenName]);
                 if (token) {
                    $auth.setToken(token);
                 } else {
                    alert("Usuario incorrecto");
                 }
                }else{
                     alert("Usuario incorrecto");
                     $rootScope.notifications[$rootScope.indexNotificacion++]="Usuario incorrecto ";
                }
            },function(reason) {
                // error: handle the error if possible and
                //        resolve promiseB with newPromiseOrValue,
                //        otherwise forward the rejection to promiseB
                console.log("promise reject");
            })
            .catch(function(response) {
                console.log("catch");
                // Handle errors here, such as displaying a notification
                // for invalid email and/or password.
            });
        }
        
        function register () {
            $auth.signup({usuario:{
                    email: vm.usuario.email,
                    password: vm.usuario.password,
                    nombre: vm.usuario.name
                }
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