(function () {

    angular
        .module('adoptaTuMascotaApp')
        .service('elementService', elementService);

     
    function elementService()  {

        var service = {};
        var savedData = {};
        service.set = set;
        service.get = get;

        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }

        return service;
    }

}());
