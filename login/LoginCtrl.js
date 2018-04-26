'use strict';
app.controller('LoginCtrl', ['$scope', '$location','localStorageService', 
	'authService','authInterceptorService','$routeParams','UsuariosFactory', 
	function ($scope, $location,localStorageService, authService,authInterceptorService,$routeParams,UsuariosFactory) {


	$scope.msgError = $routeParams.msgError;

	var authData = localStorageService.get('authorizationData');
	if (authData) {
		var url = $location.$$url;

		if(url === "/"){
			$location.path('/home')
		}
	}	


	$scope.logOut = function () {
		authService.logOut();
		$location.path('/login/' + ' logout efetuado!');
	}

	$scope.authentication = authService.authentication;

}]);