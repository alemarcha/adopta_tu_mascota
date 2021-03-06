(function () {

    angular
        .module('adoptaTuMascotaApp')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$rootScope', '$resource', '$auth', '$location', '$q', 'elementFactory'];

    function authFactory($rootScope, $resource, $auth, $location, $q, elementFactory) {

        var factory = {};

        factory.checkPermission = function () {
            return $rootScope.auth;
        }

        factory.getUserByToken = $resource("/api/private/auth/loginToken",
            {},
            {query: {cache: false}});

        factory.isAuthenticated = function () {

            var deferred = $q.defer();
            console.log("autenticando");
            // Con esto se comprueba que existe token en localStorage. Si no existe directamente no está logueado. Si existe hay que                     comprobar si el token es correcto

            //Consulta para obtener usuario a partir del token, solo si no existe el usuario ya
            //alert($auth.getToken());
            $rootScope.usuarioLogged;
            factory.getUserByToken.query().$promise
                .then(function (data) {
                    // Si existe usuario
                    if (data && data.code == 200) {
                        console.log("exito is authenticated");
                        $rootScope.usuarioLogged = data.response;
                        $rootScope.auth = true;
                        console.log("Usuario: " + JSON.stringify(data));
                        return deferred.resolve('Correcto');
                    } else {
                        eliminaVariablesLogueoSession();
                        return deferred.reject('Error');
                    }


                }, function (err) {
                    eliminaVariablesLogueoSession();
                    alert("NO exito");
                    console.log("error num total");
                    return deferred.reject('Error');
                }).catch(function (response) {
                    // Si ha habido errores durante el registro del usuario, llegaremos a esta función
                    eliminaVariablesLogueoSession();
                    $rootScope.notifications[$rootScope.indexNotificacion++] = "Se ha producido un error. Inténtelo más tarde.";
                    return deferred.reject('Error');
                });


            return deferred.promise;
        }

        factory.canEditElement = function (id) {

            var deferred = $q.defer();
            console.log("Comprobando usuario permisos");
            // Con esto se comprueba que existe token en localStorage. Si no existe directamente no está logueado. Si existe hay que                     comprobar si el token es correcto

            //Consulta para obtener usuario a partir del token, solo si no existe el usuario ya
            //alert($auth.getToken());
            elementFactory.elementById.query({
                    id: id
                }).$promise
                .then(function (data) {
                    // Si existe usuario
                        if (data) {
                            if($rootScope.usuarioLogged.email === data.usuario.email){
                            return deferred.resolve('Correcto');
                        }else{
                            return deferred.reject('Error');

                        }
                    } else {
                        
                        return deferred.reject('Error');
                    }


                }, function (err) {
                    alert("NO exito");
                    return deferred.reject('Error');
                }).catch(function (response) {
                    return deferred.reject('Error');
                });


            return deferred.promise;
        }

        function eliminaVariablesLogueoSession() {
            $rootScope.auth = false;
            delete $rootScope.usuarioLogged;
        }

        return factory;
    }


}());