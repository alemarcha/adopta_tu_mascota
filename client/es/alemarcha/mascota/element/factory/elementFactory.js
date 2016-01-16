(function () {
    
    angular
        .module('adoptaTuMascotaApp')
        .factory('elementFactory', elementFactory);
        
    elementFactory.$inject= ['$resource'];
    
	 function elementFactory ($resource)  {
        
        var factory={};
    
        factory.elementById = $resource("/api/pub/element/:id",
                                        {id:"@id"},
                                        {query: {cache:true}});

        return factory;
    }
    
	
}());