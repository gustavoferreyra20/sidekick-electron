angular.module('myAppNewPCtrl', []).controller('newPCtrl', ['$scope', 'games', 'posts', 'modes', 'platforms', 'popups',
  function($scope, games, posts, modes, platforms, popups){
  
  games.getOptions(false).then(function(response){
        $scope.gameOptions = response;
        $scope.gameSelected = $scope.gameOptions[0];

        $scope.setPlatforms($scope.gameSelected);
        $scope.setGameModes($scope.gameSelected);
        $scope.$applyAsync();
      });

      modes.getOptions(false).then(function(response){
        $scope.modeOptions = response;
        $scope.modeSelected = $scope.modeOptions[0];
        
        $scope.$applyAsync();
      });

    $scope.setPlatforms = function(selectedGame) {

      if (!selectedGame || !selectedGame.full) {
        $scope.platformOptions = [];
        $scope.platformSelected = null;
        return;
      }

      let game = selectedGame.full;

      $scope.platformOptions = game.platforms || [];
      $scope.platformSelected = $scope.platformOptions[0] || null;

      $scope.$applyAsync();
    };


    $scope.setGameModes = function(selectedGame) {
      if (!selectedGame || !selectedGame.full) {
        $scope.gameModeOptions = [];
        $scope.gameModeSelected = null;
        return;
      }

      let game = selectedGame.full;

      $scope.gameModeOptions = game.game_modes || [];
      $scope.gameModeSelected = $scope.gameModeOptions[0] || null;

      $scope.$applyAsync();
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