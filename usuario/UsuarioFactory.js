var services = angular.module('services');

services.factory('UsuariosFactory',function($resource){

	return $resource('http://localhost::port/api/Usuario',{port: '58839'},{
		query: {method: 'GET', isArray: true},
		create: {method: 'POST'}
	});

});

services.factory('UsuarioFactory',function($resource){

	return $resource('http://localhost::port/api/Usuario/:id',{port: '58839',id: '@id'},{
		show: {method: 'GET' },
		showByEmail: {method: 'GET'},
		update: {method: 'PUT'},
		delete: {method: 'DELETE'}
	});

});


