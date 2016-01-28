angular.module('adoptaTuMascotaApp', ['ngRoute','ngResource','angularUtils.directives.dirPagination','angularSpinner','growlNotifications']);

angular.module('adoptaTuMascotaApp').config(['$routeProvider',
  function($routeProvider) {
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