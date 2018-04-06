app.controller('UsuarioCtrl',['$scope','$location','UsuariosFactory','UsuarioFactory','$routeParams',
	function($scope,$location,UsuariosFactory,UsuarioFactory,$routeParams){

		$scope.usuarios = UsuariosFactory.query();

		var url = $location.$$url;
		var id = undefined; 
		if(url.indexOf("cadastrarPaciente") > 0){
			id = $routeParams.id;
			//debugger;
			if(id){
				UsuarioFactory.show({id:id}).$promise.then(function(data){
					$scope.usuario = data;
					$scope.confirmacaoSenha = data.Senha;
				});
			}
		}

		//var url = $location.$$url;

		$scope.salvarUsuario = function(){

			if($scope.usuario.Senha != $scope.confirmacaoSenha){
				$scope.msgError = "As senhas não conferem!";
				$scope.usuario.Senha = "";
				$scope.confirmacaoSenha = "";
				return;
			}

			if(id == undefined){
				adicionarUsuario();
			}else{
				alterarUsuario();
			}
		};

		$scope.desasociarPaciente = function(index,UsuariosFactory){

		}

		$scope.alterarPaciente = function(id){
			$location.path("/cadastrarPaciente/" + id);
		}

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$("#dataTable").DataTable();
		});

		
		function adicionarUsuario(){
			UsuariosFactory.create($scope.usuario)
			.$promise.then(function(usuario){
				$scope.msgSucesso = "Paciente salvo com sucesso!";
				delete $scope.usuario;
				$scope.confirmacaoSenha = "";
			}).catch( function(errorResponse) {
				if(errorResponse.data){
					if(errorResponse.data.ExceptionMessage){
						$scope.msgError = "Ocorreu um erro ao salvar: " + 
						errorResponse.data.ExceptionMessage;
					}else{
						debugger;
						$scope.msgError = parseErrors(errorResponse.data);
					}
				}else if(errorResponse.Exception)
				$scope.msgError = "Ocorreu um erro ao salvar: " + errorResponse.Exception;
				else
					$scope.msgError = "Ocorreu um erro ao salvar!"
				$scope.msgSucesso = "";
			});
		}

		function alterarUsuario() {
			UsuarioFactory.update({id:$scope.usuario.Id},$scope.usuario)
			.$promise.then(function(usuario){
				$scope.msgSucesso = "Paciente salvo com sucesso!";
			}).catch( function(errorResponse) {
				if(errorResponse.data){
					if(errorResponse.data.ExceptionMessage){
						$scope.msgError = "Ocorreu um erro ao salvar: " + 
						errorResponse.data.ExceptionMessage;
					}else{
						debugger;
						$scope.msgError = parseErrors(errorResponse.data);
					}
				}else if(errorResponse.Exception)
				$scope.msgError = "Ocorreu um erro ao salvar: " + errorResponse.Exception;
				else
					$scope.msgError = "Ocorreu um erro ao salvar!"
				$scope.msgSucesso = "";
			});
		}

		function parseErrors(response) {
			var errors = "";
			for (var key in response.ModelState) {
				for (var i = 0; i < response.ModelState[key].length; i++) {
					errors += response.ModelState[key][i] + ";";
				}
			}
			return errors;
		}

	}]);
