(function () {

    angular
        .module('adoptaTuMascotaApp')
        .factory('centralFactory', centralFactory);

    centralFactory.$inject = ['$resource'];

    function centralFactory($resource) {

        var factory = {};

        factory.allElements = $resource("/api/pub/elements/", {}, {query: {cache: true}});

        factory.paginationElements = $resource("/api/pub/elementsPagination/");

        factory.numTotalElements = $resource("/api/pub/elements/numTotal");

        return factory;
    }


}());