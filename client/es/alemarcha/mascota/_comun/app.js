angular.module('adoptaTuMascotaApp', ['ngRoute', 'ngResource', 'angularUtils.directives.dirPagination', 'angularSpinner', 'growlNotifications', 'satellizer', 'ngMap', 'angularMoment', '720kb.socialshare', 'ngFileUpload', 'jkuri.gallery']);

angular.module('adoptaTuMascotaApp').config(['$routeProvider', '$authProvider',
    function ($routeProvider, $authProvider ) {

        // No additional setup required for Twitter
        $authProvider.httpInterceptor = function () {
            return true;
        },
        $authProvider.baseUrl = '/api';
        $authProvider.loginUrl = '/pub/auth/login';
        $authProvider.signupUrl = '/pub/auth/register';
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
            access: {
                restricted: true
            },
            controllerAs: 'newElement'
        }).
        when('/editarElemento/:id', {
            templateUrl: 'editarElemento/view/editarElemento.html',
            controller: 'EditarElementoCtrl',
            access: function($scope){
                return {
                    restricted: true,
                    unique: true      
                }
            }(),
            resolve:{
                "accommodation": function(authFactory) {
                    return authFactory.authToAccess({
                        restricted: true,
                        unique: true
                    });
                }
            },
            controllerAs: 'editarElementoCtrl'
        }).
        when('/404', {
            templateUrl: 'error/404/404.html'
        }).
        when('/401', {
            templateUrl: 'error/401/401.html'
        }).
        when('/500', {
            templateUrl: 'error/500/500.html'
        }).
        otherwise({
            templateUrl: 'main/view/central.html',
            controller: 'CentralCtrl',
            controllerAs: 'central'
        });


    }]);

//angular.module('adoptaTuMascotaApp').run(['authFactory','$rootScope', function (authFactory, $rootScope) {
//    $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
//        return authFactory.authToAccess(curr);
//    });
//}]);





angular.module('adoptaTuMascotaApp').run(
    function ($rootScope) {
        $rootScope.loading = false;
        $rootScope.showGrowl = false;
        $rootScope.indexNotificacion = 0;
        $rootScope.notifications = {};
    });


//CUANDO ACCEDO A NEW POR EJEMPLO TENIENDO PERMISOS NO PUEDE APARECER LA PANTALLA SI AL FINAL NO VA A MOSTRARSE. TIENE QUE APARECER CARGANDO
