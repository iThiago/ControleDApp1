'use strict';
app.controller('loginController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
 
    $scope.loginData = {
        userName: "",
        password: ""
    };
 
    $scope.message = "";
 
    $scope.login = function () {
 
        authService.login($scope.loginData).then(function (response) {
            debugger;
            $location.path('/alimento/listar');
 
        },
         function (err) {
             $scope.msgError = err.error_description;
         });
    };
 
}]);