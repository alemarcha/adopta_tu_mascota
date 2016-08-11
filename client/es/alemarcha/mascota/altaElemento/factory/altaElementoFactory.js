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

        factory.getProvincias = $resource("/api/pub/findProvincias/", {
            query: {
                cache: true
            }
        });

        factory.getMunicipios = $resource("/api/pub/findMunicipios/:idProvincia",{ idProvincia: '@idProvincia' }, {
            query: {
                cache: true
            }
        });


        return factory;
    }

}());
