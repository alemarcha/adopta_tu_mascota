angular.module('adoptaTuMascotaApp', ['ngRoute']);

angular.module('adoptaTuMascotaApp').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'es/alemarcha/mascota/registro/view/login.html',
        controller: 'RegistroCtrl',
        controllerAs: 'registro'
      }).
      otherwise({
        templateUrl: 'es/alemarcha/mascota/main/view/central.html',
        controller: 'CentralCtrl',
        controllerAs: 'central'
      });
  }]);