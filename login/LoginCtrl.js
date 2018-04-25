'use strict';
app.controller('LoginCtrl', ['$scope', '$location','localStorageService', 
	'authService','authInterceptorService','$routeParams','UsuariosFactory', 
	function ($scope, $location,localStorageService, authService,authInterceptorService,$routeParams,UsuariosFactory) {


		$scope.senhaTemporaria = true;

		$scope.init = function(){
			$scope.pacientesSenhaTemporaria = UsuariosFactory.queryPacientesSenhaTemporaria();
		}



		$scope.verificaSenhaTemporaria = function(){

			if($scope.loginData.userName.lenght > 9){
				$scope.pacientesSenhaTemporaria = $filter($scope.pacientesSenhaTemporaria,$scope.loginData.userName,strict);
				alert($scope.pacientesSenhaTemporaria);
			}

		}


	//	debugger;
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