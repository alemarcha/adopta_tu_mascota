angular.module('adoptaTuMascotaApp', ['ngRoute','ngResource']);

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
      otherwise({
        templateUrl: 'es/alemarcha/mascota/main/view/central.html',
        controller: 'CentralCtrl',
        controllerAs: 'central'
      });
  }]);