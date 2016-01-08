angular.module('adoptaTuMascotaApp', ['ngRoute','ngResource','angularUtils.directives.dirPagination','angularSpinner']);

angular.module('adoptaTuMascotaApp').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/login', {
        templateUrl: 'es/alemarcha/mascota/registro/view/login.html',
        controller: 'RegistroCtrl',
        controllerAs: 'registro'
    }).
    when('/element/:id', {
        templateUrl: 'es/alemarcha/mascota/element/view/element.html',
        controller: 'ElementCtrl',
        controllerAs: 'element'
    }).
    when('/404', {
        templateUrl: 'es/alemarcha/mascota/error/404/404.html'
    }).
    otherwise({
        templateUrl: 'es/alemarcha/mascota/main/view/central.html',
        controller: 'CentralCtrl',
        controllerAs: 'central'
    });
  }]);