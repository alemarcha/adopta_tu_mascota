(function () {
    angular.module("adoptaTuMascotaApp").constant('CONSTANTS', {
        DATE_FORMAT: 'DD/MM/YYYY HH:mm:ss',
        ERROR: 'Se ha producido un error. Inténtelo más tarde.',
        ERROR_EMAIL_EXISTE: 'El email ya existe',
		LOGOUT: 'Ha cerrado sesión correctamente.',
		REQUIRE_FIELDS : 'Complete los campos requeridos',
		LOGIN: 'Usuario logueado correctamente',
		ERROR_LOGIN: 'Usuario incorrecto',
		REGISTER_USER: 'Usuario registrado correctamente'
    });

}());