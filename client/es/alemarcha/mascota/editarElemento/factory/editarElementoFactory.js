(function () {

    angular
        .module('adoptaTuMascotaApp')
        .factory('editarElementoFactory', editarElementoFactory);

    editarElementoFactory.$inject = ['$resource'];


    function editarElementoFactory($resource) {

        var factory = {};

        factory.updateElement = $resource("/api/pub/element/", {
            'update': {method: 'PUT'}
        });

        return factory;
    }

}());
