(function () {
    angular
    .module('adoptaTuMascotaApp')
    .controller('RegistroCtrl', registroCtrl);
    
    registroCtrl.$inject = ['$routeParams','$auth','$location', 'SatellizerConfig','$rootScope','authFactory'];
    
    function registroCtrl($routeParams, $auth, $location, config, $rootScope, authFactory) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.logout = logout;
        
        
        initialize();

        function initialize () {
            vm.usuario = {};
            //alert($auth.getToken());
        }
            
        function login (form) {
            $rootScope.auth=false;    
            // Comprobamos que los campos requeridos estan rellenos
            if(vm.usuario.email 
                    && vm.usuario.password){
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
                    $rootScope.auth=true;    
                    $auth.setToken(token);
                    $rootScope.notifications[$rootScope.indexNotificacion++]="Usuario logueado correctamente";
                    $location.url('/');
                 } else {
                    alert("Usuario incorrecto");
                    $rootScope.notifications[$rootScope.indexNotificacion++]="Usuario incorrecto";
                 }
                }else{
                     alert("Usuario incorrecto");
                     $rootScope.notifications[$rootScope.indexNotificacion++]="Usuario incorrecto";
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
            }else{
                   // Si los campos no se han rellenado correctamente
                form.$valid=false;    
                $rootScope.notifications[$rootScope.indexNotificacion++] = "Complete los campos requeridos.";
            }
        }
        
        function register (form) {
            
            // Comprobamos que los campos requeridos estan rellenos
            if(vm.usuarioRegisto.email 
                    && vm.usuarioRegisto.password 
                    && vm.usuarioRegisto.name
                    && vm.usuarioRegisto.lastname
                    && vm.usuarioRegisto.address
                    && vm.usuarioRegisto.city
                    && vm.usuarioRegisto.country){
            
                $auth.signup({usuario:{
                        email: vm.usuarioRegisto.email,
                        password: vm.usuarioRegisto.password,
                        nombre: vm.usuarioRegisto.name,
                        apellidos: vm.usuarioRegisto.lastname,
                        direccion: vm.usuarioRegisto.address,
                        ciudad: vm.usuarioRegisto.city,
                        pais: vm.usuarioRegisto.country

                    }
                })
                .then(function(response) {
                    // Si se ha registrado correctamente,
                    // Redirigimos a la pantalla de inicio y mostramos mensaje de registro
                    if(response && response.data){
                     var token = response.data[config.tokenName];
                     //alert(response.data[config.tokenName]);
                     if (token) {
                        $auth.setToken(token);
                        $rootScope.notifications[$rootScope.indexNotificacion++] = "Usuario registrado correctamente" + $auth.getToken();
                        $location.url('/');
                     } else {
                        $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha producido un error";
                     }
                    }else{
                         $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha producido un error";
                    }

                })
                .catch(function(response) {
                    // Si ha habido errores durante el registro del usuario, llegaremos a esta función
                     $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha producido un error. Inténtelo más tarde.";
                });   
            }else{
                // Si los campos no se han rellenado correctamente
                form.$valid=false;   
                $rootScope.notifications[$rootScope.indexNotificacion++] = "Complete los campos requeridos.";
            }
        }
        
            
        function logout () {
            
            // Comprobamos que los campos requeridos estan rellenos
           
            
                $auth.logout()
                .then(function(response) {
                   $rootScope.notifications[$rootScope.indexNotificacion++] = "Ha cerrado sesión correctamente";
                    delete $rootScope.usuarioLogged;
                    $rootScope.auth=false;

                })
                .catch(function(response) {
                    // Si ha habido errores durante el registro del usuario, llegaremos a esta función
                     $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha producido un error. Inténtelo más tarde.";
                });   
         
    }
    
    }
    
}());