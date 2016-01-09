(function () {
	function configuradorInterceptores($httpProvider) {
		$httpProvider.interceptors.push(funcionInterceptoraSeguridad);
	}

	function funcionInterceptoraSeguridad($q, $log, $location, $rootScope) {

		var interceptor = {};
		interceptor.request = function (request) {
            $log.info('REQUEST SECURITY CLIENTE');
            $rootScope.loading=true;
			return request;
		};
		interceptor.response = function (response) {
            $log.info('RESPONSE SECURITY CLIENTE');
            if (response.status === 401) {
				$rootScope.mensaje = "No hay derecho!!!";
				$log.info('401 SECURITY CLIENTE');			 
                $location.url('/404');
			} else if (response.status === 419) {
				$rootScope.mensaje = "Estoy caduco!!!";
				$cookieStore.remove("sessionId")
				$location.url('/404');
			} else if (response.status === 404) {
                $log.info('404 SECURITY CLIENTE');			 
                $rootScope.loading=false;
				$location.url('/404');
			}else if (response.status === 200) {
                $log.info('200 SECURITY CLIENTE');	
                $rootScope.loading=false;
                return $q.resolve(response);
            };
			return $q.reject(response);
		}
        
         interceptor.responseError = function (response) {
            $log.info('RESPONSE SECURITY CLIENTE');
            if (response.status === 401) {
				$rootScope.mensaje = "No hay derecho!!!";
				$log.info('401 SECURITY CLIENTE');			 
                $location.url('/404');
			} else if (response.status === 419) {
				$rootScope.mensaje = "Estoy caduco!!!";
				$cookieStore.remove("sessionId")
				$location.url('/404');
			} else if (response.status === 404) {
                $log.info('404 SECURITY CLIENTE');			 
                $rootScope.loading=false;
				$location.url('/404');
			};
			return $q.reject(response);
		}
	
		return interceptor;
	}
    
   

	angular.module('adoptaTuMascotaApp').config(configuradorInterceptores);
}());