'use strict';
app.controller('LoginCtrl', ['$scope', '$location','localStorageService', 'authService','authInterceptorService','$routeParams', 
	function ($scope, $location,localStorageService, authService,authInterceptorService,$routeParams) {


		debugger;
		$scope.msgError = $routeParams.msgError;

		var authData = localStorageService.get('authorizationData');
		if (authData) {
			var url = $location.$$url;
			
			if(url.indexOf("login") > 0){
				$location.path('/home')
			}
		}	


		$scope.logOut = function () {
			authService.logOut();
			$location.path('/login/' + ' logout efetuado!');
		}

		$scope.authentication = authService.authentication;

	}]);