angular.module('myAppHomeCtrl', ['myAppGameCtrl']).controller('homeCtrl', ['$scope', function($scope){
    postController.getPosts().then(
        function(response){
            postController.loadPosts(response).then(function(posts){
                $scope.posts = posts;
                $scope.$applyAsync();
            })
        }
      )

      modeController.getOptions(true).then(function(response){
        $scope.modeOptions = response;
        $scope.modeSelected = $scope.modeOptions[0];
        
        $scope.$applyAsync();
      });

      $scope.setPlatforms = function(arg = null){
        var game;

        if(arg != null){
          game = (arg.value != 'any') ? arg.value : null;
        }else{
          game = arg;
        }

        platformController.getOptions(game, true).then(function(response){
          $scope.platformOptions = response;
          $scope.platformSelected = $scope.platformOptions[0];
          
          $scope.$applyAsync();
        }); 
       
      }; 
      
      $scope.btnSearchPost = function(game, platform, mode){
        let params = {};

        if(game.value != 'any'){
          params.id_game = game.value;
        }
    
        if(platform.value != 'any'){
          params.id_platform = platform.value;
        }
    
        if(mode.value != 'any'){
          params.id_mode = mode.value;
        }

        postController.getPosts(params).then(
          function(response){
              postController.loadPosts(response).then(function(response){
                  $scope.posts = response;
                  $scope.$applyAsync();
              })
          }
        )
       
      };
      
      $scope.btnSubmitApplication = function(id_post){
        postController.getApplications({id_post: id_post, id_user: userSession.id_user, type: 'sended'})
        .then((res) => {
          if(res[0]){
            popupController.alert("Ya existe una solicitud pendiente");
          }else{
            postController.addApplication({id_post: id_post, id_user: userSession.id_user})
            .then(popupController.alert("Solicitud enviada"));     
          }
         
        })  
      };  

}]);