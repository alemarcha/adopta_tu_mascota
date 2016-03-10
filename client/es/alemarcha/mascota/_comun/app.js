angular.module('adoptaTuMascotaApp', ['ngRoute','ngResource','angularUtils.directives.dirPagination','angularSpinner','growlNotifications','satellizer']);

angular.module('adoptaTuMascotaApp').config(['$routeProvider', '$authProvider',
  function($routeProvider,$authProvider) {
            
    // No additional setup required for Twitter
$authProvider.httpInterceptor = function() { return true; },
$authProvider.baseUrl = '/api';
$authProvider.loginUrl = '/private/auth/login';
$authProvider.signupUrl = '/private/auth/register';
$authProvider.tokenName = 'token';
$authProvider.tokenPrefix = 'adoptaTuMascotaApp';
$authProvider.authHeader = 'Authorization';
$authProvider.authToken = 'Bearer';
$authProvider.storageType = 'localStorage';
      
    // ROUTE
    $routeProvider.
    when('/login', {
        templateUrl: 'registro/view/login.html',
        controller: 'RegistroCtrl',
        controllerAs: 'registro'
    }).
    when('/element/:id', {
        templateUrl: 'element/view/element.html',
        controller: 'ElementCtrl',
        controllerAs: 'element'
    }).
     when('/new', {
        templateUrl: 'altaElemento/view/new.html',
        controller: 'NewElementCtrl',
        resolve:{
        "check": function(authFactory) { authFactory.checkPermission() },
        },
        controllerAs: 'newElement'
    }).
    when('/404', {
        templateUrl: 'error/404/404.html'
    }).
    otherwise({
        templateUrl: 'main/view/central.html',
        controller: 'CentralCtrl',
        controllerAs: 'central'
    });

      
  }]);

    angular.module('adoptaTuMascotaApp').run(
    function ($rootScope) {
        $rootScope.loading = false;
        $rootScope.showGrowl= false;
        $rootScope.indexNotificacion=0;
        $rootScope.notifications={};
    });

     function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }