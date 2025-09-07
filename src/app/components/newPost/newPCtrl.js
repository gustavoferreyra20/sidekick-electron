angular.module('myAppNewPCtrl', []).controller('newPCtrl', ['$scope', 'games', 'posts', 'modes', 'platforms', 'popups',
  function($scope, games, posts, modes, platforms, popups){
  
  games.getOptions(false).then(function(response){
        $scope.gameOptions = response;
        $scope.gameSelected = $scope.gameOptions[0];
        
        $scope.setPlatforms();
        $scope.$applyAsync();
      });

      modes.getOptions(false).then(function(response){
        $scope.modeOptions = response;
        $scope.modeSelected = $scope.modeOptions[0];
        
        $scope.$applyAsync();
      });

      $scope.setPlatforms = function(arg = null){
        game = (arg != null) ? arg.value : null;

        platforms.getOptions(game, false).then(function(response){
          $scope.platformOptions = response;
          $scope.platformSelected = $scope.platformOptions[0];
          
          $scope.$applyAsync();
        }); 
       
      };

  $scope.createPost = async function(form, game, platform, mode){
    form.game = game;
    form.platform = platform;
    form.mode = mode;

    try {
      await posts.save(form);
      popups.function("Anuncio creado con exito", function () {
        window.location.href = "#/home";
      });
    } catch(error) {
      console.log(error);
      popups.alert("Ocurrió un error al crear el anuncio");
    }
  };
}]);