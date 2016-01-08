(function () {
	 function elementFactory ($resource)  {
        

        var factory={};
    
    
        factory.elementById = $resource("/api/pub/element/:id",{id:"@id"},{query: {cache:true}});
        

        return factory;
    }
    
	angular.module('adoptaTuMascotaApp').factory('elementFactory', elementFactory);
}());