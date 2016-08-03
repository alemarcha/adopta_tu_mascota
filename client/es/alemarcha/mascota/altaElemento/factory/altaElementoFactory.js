(function () {

    angular
        .module('adoptaTuMascotaApp')
        .factory('altaElementoFactory', altaElementoFactory);

    altaElementoFactory.$inject = ['$resource'];


    function altaElementoFactory($resource) {

        var factory = {};

        factory.insertElement = $resource("/api/pub/element/:id", { id: '@_id' }, {
            'update': {method: 'PUT'}
        });

        factory.getTiposMascotas = $resource("/api/pub/findTiposMascotas/", {
            query: {
                cache: true
            }
        });

        return factory;
    }

}());
