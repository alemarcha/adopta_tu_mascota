(function () {
    angular
    .module('adoptaTuMascotaApp')
    .controller('RegistroCtrl', registroCtrl);
    
    registroCtrl.$inject = ['$routeParams','$auth','$location', 'SatellizerConfig','$rootScope','authFactory', 'CONSTANTS'];
    
    function registroCtrl($routeParams, $auth, $location, config, $rootScope, authFactory, CONSTANTS) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.logout = logout;
        
        
        initialize();

        function initialize () {
            vm.usuario = {};
        }
            
        function login (form) {
            $rootScope.auth=false;    
            // Comprobamos que los campos requeridos estan rellenos
            if(vm.usuario.email 
                    && vm.usuario.password){
                $auth.login({
                    email: vm.usuario.email,
                    password: vm.usuario.password
                })
                .then(function(response) {
                    // Redirect user here after a successful log in.+
                    if(response && response.data.code == 200 ){
                         var token = response.data.response[config.tokenName];
                        var data = response.data.response.data;

                        //alert(response.data[config.tokenName]);
                         if (token) {
                             window.localStorage.setItem("usuarioLogged", angular.toJson(data));
                             window.localStorage.setItem("auth", true);
                             $rootScope.auth=true;
                             $rootScope.usuarioLogged = data;

                             alert($rootScope.usuarioLogged.nombre);

                             $auth.setToken(token);
                            $rootScope.notifications[$rootScope.indexNotificacion++]=CONSTANTS.LOGIN;
                            $location.url('/');
                         } else {
                            alert("Usuario incorrecto");
                            $rootScope.notifications[$rootScope.indexNotificacion++]=CONSTANTS.ERROR_LOGIN;
                         }
                    } else {
                        alert("Usuario incorrecto");
                    }
                },function(reason) {
                    // error: handle the error if possible and
                    //        resolve promiseB with newPromiseOrValue,
                    //        otherwise forward the rejection to promiseB
                    alert("promise reject");
                })
                .catch(function(response) {
                    alert("catch");
                    // Handle errors here, such as displaying a notification
                    // for invalid email and/or password.
                    $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.ERROR;

                });
            }else{
                   // Si los campos no se han rellenado correctamente
                form.$valid=false;    
                $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.REQUIRE_FIELDS;
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
                    if(response && response.data && response.data.code== 200 ){
                     var token = response.data.response[config.tokenName];
                     //alert(response.data[config.tokenName]);
                     if (token) {
                        $auth.setToken(token);
                        $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.REGISTER_USER + $auth.getToken();
                        $location.url('/');
                     } else {
                        $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.ERROR;
                     }
                    }else if(response.data.code == -1){
                        $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.ERROR_EMAIL_EXISTE;
                    
                    }else{
                        console.log(JSON.stringify(response));
                         $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.ERROR;
                    }

                })
                .catch(function(response) {
                    // Si ha habido errores durante el registro del usuario, llegaremos a esta función
                     $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.ERROR;
                });   
            }else{
                // Si los campos no se han rellenado correctamente
                form.$valid=false;   
                $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.REQUIRE_FIELDS;
            }
        }
        
            
        function logout () {


                // Comprobamos que los campos requeridos estan rellenos
            alert("logout");
                $auth.logout()
                .then(function(response) {
                    alert("logout 2");

                    window.localStorage.setItem("usuarioLogged", null);
                    window.localStorage.setItem("auth", false);
                    $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.LOGOUT;
                    $rootScope.usuarioLogged =window.localStorage.getItem("usuarioLogged");
                    $rootScope.auth=false;
                    alert(JSON.stringify($rootScope.usuarioLogged));
                })
                .catch(function(response) {
                    // Si ha habido errores durante el logout del usuario, llegaremos a esta función
                     $rootScope.notifications[$rootScope.indexNotificacion++] = CONSTANTS.ERROR;
                });   
         
    }
    
    }
    
}());