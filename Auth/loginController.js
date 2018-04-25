'use strict';
app.controller('loginController', ['$scope', '$location', 'authService','UsuariosFactory','$filter', function ($scope, $location, authService,UsuariosFactory,$filter) {

    $scope.loginData = {
        userName: "",
        password: "",
        senhaTemporaria: false
    };


    $scope.senhaTemporaria = true;

    $scope.init = function(){
        $scope.pacientesSenhaTemporaria = UsuariosFactory.queryPacientesSenhaTemporaria();
    }



    $scope.verificaSenhaTemporaria = function(){

        if($scope.loginData.userName){

            var user = $filter('filter')($scope.pacientesSenhaTemporaria, { Email: $scope.loginData.userName });
            if(user.length == 0){
                $scope.senhaTemporaria = false;    
            }else{
                $scope.senhaTemporaria = true;    
            }

        }else
        {
            $scope.senhaTemporaria = true;    
        }
    }


    $scope.message = "";
    
    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {
            $scope.msgError = "";
            $location.path('/alimento/listar');
        },
        function (err) {
           $scope.loginMsgError = "Usuario ou senha não encontrado!";
       });
    };

}]);