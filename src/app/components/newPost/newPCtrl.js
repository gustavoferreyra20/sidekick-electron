angular.module('myAppNewPCtrl', []).controller('newPCtrl', ['$scope', function($scope){
  
    gameController.getOptions(false).then(function(response){
        $scope.gameOptions = response;
        $scope.gameSelected = $scope.gameOptions[0];
        
        $scope.setPlatforms();
        $scope.$applyAsync();
      });

      modeController.getOptions(false).then(function(response){
        $scope.modeOptions = response;
        $scope.modeSelected = $scope.modeOptions[0];
        
        $scope.$applyAsync();
      });

      $scope.setPlatforms = function(arg = null){
        game = (arg != null) ? arg.value : null;

        platformController.getOptions(game, false).then(function(response){
          $scope.platformOptions = response;
          $scope.platformSelected = $scope.platformOptions[0];
          
          $scope.$applyAsync();
        }); 
       
      }; 
    
      $scope.createPost = function(form, game, platform, mode){
       form.game = game;
       form.platform = platform;
       form.mode = mode;
       console.log(typeof form)
       //postController.savePost(form);
      };  
}]);