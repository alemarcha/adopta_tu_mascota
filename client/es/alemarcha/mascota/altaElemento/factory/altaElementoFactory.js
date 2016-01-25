(function () {
    
    angular
        .module('adoptaTuMascotaApp')
        .factory('altaElementoFactory', altaElementoFactory);
        
    altaElementoFactory.$inject= ['$resource'];
    
	 function altaElementoFactory ($resource)  {
        
        var factory={};
    
        factory.insertElement = $resource("/api/pub/alta/element",{elementData:'@elementData'});

        return factory;
    }
    
	
}());