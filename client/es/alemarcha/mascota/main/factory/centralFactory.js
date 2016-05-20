(function () {

    angular
        .module('adoptaTuMascotaApp')
        .factory('centralFactory', centralFactory);

    centralFactory.$inject = ['$resource'];

    function centralFactory($resource) {

        var factory = {};

        factory.allElements = $resource("/api/pub/elements/", {}, {query: {cache: true}});

        factory.paginationElements = $resource("/api/pub/elements/:fromPage/:numElements/:sortby",
            {fromPage: "@fromPage", numElements: "@numElements", sortby: "@sortby"},
            {query: {cache: false}});
        factory.numTotalElements = $resource("/api/pub/elements/numTotal",
            {},
            {query: {cache: false}});

        return factory;
    }


}());