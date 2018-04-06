app.controller('HomeCtrl',function($scope,$rootScope,$location,localStorageService){

	 var authData = localStorageService.get('authorizationData');
        if (!authData) {
        	var url = $location.$$url;
			if(url.indexOf("home") > 0){
				$location.path('/login')
			}
		}else{
        	$scope.NomeUsuario = authData.NomeUsuario;
        }

});