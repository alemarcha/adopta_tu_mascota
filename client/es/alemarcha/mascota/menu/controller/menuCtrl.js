(function () {
    angular
        .module('adoptaTuMascotaApp')
        .controller('MenuCtrl', menuCtrl);
    
        menuCtrl.$inject = ['$location'];

        function menuCtrl ($location) {
             this.isActive = function (estado) {
                console.log("Location: " + $location.path() + " Estado: " + estado);
                //console.log($location.path() === estado);
                if(!$location.path()  && estado ==='/'){
                    return true;
                }
                return $location.path() === estado;
            }
        }
}());