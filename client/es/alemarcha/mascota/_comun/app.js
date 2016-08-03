angular.module('adoptaTuMascotaApp', ['ngRoute', 'ngResource', 'angularUtils.directives.dirPagination', 'angularSpinner', 'growlNotifications', 'satellizer', 'ngMap', 'angularMoment', '720kb.socialshare', 'ngFileUpload', 'jkuri.gallery']);

angular.module('adoptaTuMascotaApp').config(['$routeProvider', '$authProvider',
    function ($routeProvider, $authProvider) {

        // No additional setup required for Twitter
        $authProvider.httpInterceptor = function () {
            return true;
        },
            $authProvider.baseUrl = '/api';
        $authProvider.loginUrl = '/auth/login';
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
            access: {
                restricted: true
            },
            controllerAs: 'newElement'
        }).
        when('/editarElemento/:id', {
            templateUrl: 'editarElemento/view/editarElemento.html',
            controller: 'EditarElementoCtrl',
            access: {
                restricted: true
            },
            controllerAs: 'editarElementoCtrl'
        }).
        when('/404', {
            templateUrl: 'error/404/404.html'
        }).
        when('/401', {
            templateUrl: 'error/401/401.html'
        }).
        otherwise({
            templateUrl: 'main/view/central.html',
            controller: 'CentralCtrl',
            controllerAs: 'central'
        });


    }]);

angular.module('adoptaTuMascotaApp').run(['$rootScope', '$location', '$route', 'authFactory', '$auth', function ($rootScope, $location, $route, authFactory, $auth) {
    $rootScope.$on('$routeChangeStart', function (e, curr, prev) {

        // Show a loading message until promises aren't resolved
        $rootScope.loading = true;


        if ($auth.isAuthenticated()) {

            authFactory.isAuthenticated().then(function (data) {
                if (curr.access && curr.access.restricted) {

                    if (!$rootScope.auth) {
                        $location.path('/login');
                        $route.reload();
                    } else {
                        alert("Entrando en lugar restringido: " + $rootScope.usuarioLogged.nombre);
                    }
                }
            }, function (data) {

                // Since this segment of the promise signals that the user is not
                // logged in, if the page is not publicly accessible, redirect to login

                $location.path('/login');

            }).catch(function (response) {
                $location.path('/login');
            });

        } else {
            if (curr.access && curr.access.restricted) {
                $location.path('/login');
            }
        }

    });
}]);


angular.module('adoptaTuMascotaApp').run(
    function ($rootScope) {
        $rootScope.loading = false;
        $rootScope.showGrowl = false;
        $rootScope.indexNotificacion = 0;
        $rootScope.notifications = {};
    });


//CUANDO ACCEDO A NEW POR EJEMPLO TENIENDO PERMISOS NO PUEDE APARECER LA PANTALLA SI AL FINAL NO VA A MOSTRARSE. TIENE QUE APARECER CARGANDO
