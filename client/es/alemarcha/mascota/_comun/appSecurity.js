(function () {

angular
.module('adoptaTuMascotaApp')
.config(configuradorInterceptores);

	function configuradorInterceptores($httpProvider) {
		$httpProvider.interceptors.push(funcionInterceptoraSeguridad);
	}

	function funcionInterceptoraSeguridad($q, $log, $location, $rootScope, SatellizerConfig) {

		var interceptor = {};
		interceptor.request = function (request) {
            $log.info('REQUEST SECURITY CLIENTE');
            $rootScope.loading=true;
            // Monta el nombre del token
 			var tokenName = SatellizerConfig.tokenPrefix ? SatellizerConfig.tokenPrefix + '_' + SatellizerConfig.tokenName :                  SatellizerConfig.tokenName;
 			// A partir del nombre del token lo recuperamos de local storage
            var token=localStorage.getItem(tokenName);
            // Obtenemos el nombre de la cabecera
            var authHeader=SatellizerConfig.authHeader;
            console.log(tokenName);
            console.log("Header: "+authHeader);
            console.log("Token:"+ token);
            // Si existe token
             if (token) {
             // Creamos el token que vamos a enviar al servidor en las cabeceras
              token = authHeader === 'Authorization' ? 'Bearer ' + token : token;
             // Seteamos el token en la cabecera
              request.headers[authHeader] = token;
            }
            
            console.log("Request recibida: "+JSON.stringify(request));
			return request;
		};
		interceptor.response = function (response) {
            $log.info('RESPONSE SECURITY CLIENTE RESPONSE');
           if (response.status === 200) {
                $log.info('200 SECURITY CLIENTE');	
                $rootScope.loading=false;
                return $q.resolve(response);
            };
			return $q.reject(response);
		}
        
         interceptor.responseError = function (response) {
            $log.info('RESPONSE SECURITY CLIENTE');
            $rootScope.loading=false;
      if (response.status === 401) {
				$rootScope.mensaje = "No hay derecho!!!";
				$log.info('401 SECURITY CLIENTE');			 
        $location.url('/login');
			} else if (response.status === 419) {
				$rootScope.mensaje = "Estoy caduco!!!";
				$cookieStore.remove("sessionId")
				$location.url('/404');
			} else if (response.status === 404) {
                $log.info('404 SECURITY CLIENTE');			 
				$location.url('/404');
			} else if (response.status === 500) {
                $rootScope.notifications[$rootScope.indexNotificacion++]="Error 500";
            };
			return $q.reject(response);
		}
	
		return interceptor;
	}
}());