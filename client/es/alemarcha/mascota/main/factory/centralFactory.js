(function () {
	var centralFactory =   function ($resource)  {
		return $resource("/api/pub/elements/",{},{query: {cache: true}});
	};
	
	angular.module('adoptaTuMascotaApp').factory('centralFactory', centralFactory);
}());