angular.module('myAppNewPCtrl', ['searchableDropdownDirective'])
  .controller('newPCtrl', ['$scope', '$stateParams', '$state', 'games', 'posts', 'modes', 'platforms', 'popups',
    function($scope, $stateParams, $state, games, posts, modes, platforms, popups){

      $scope.isEdit = !!$stateParams.id_post;
      $scope.form = {};
      $scope.gameOptions = [];
      $scope.platformOptions = [];
      $scope.gameModeOptions = [];

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
        $scope.gameModeOptions = (game.game_modes || []).filter(m => m.id !== 1);
        $scope.gameModeSelected = $scope.gameModeOptions[0] || null;
        $scope.$applyAsync();
      };

      $scope.onGameSelect = function(selectedGame) {
        $scope.gameSelected = selectedGame;
        $scope.setPlatforms(selectedGame);
        $scope.setGameModes(selectedGame);
      };

      async function initCreate() {
        games.getOptions(false).then(function(response){
          $scope.gameOptions = response || [];
          $scope.gameSelected = $scope.gameOptions[0];

          $scope.setPlatforms($scope.gameSelected);
          $scope.setGameModes($scope.gameSelected);
          $scope.$applyAsync();
        });
      }

      async function initEdit(id_post) {
        try {
          const post = await posts.getSingle(id_post);

          $scope.form.title = post.title;
          $scope.form.description = post.description || '';
          $scope.form.userRequire = String(post.requiredusers || '1');

          $scope.form.gameName = post.gameName || ('Juego #' + post.id_game);

          const gameFull = await games.getById(post.id_game);

          $scope.gameSelected = {
            value: post.id_game,
            name: gameFull.name || $scope.form.gameName,
            full: gameFull
          };

          $scope.setPlatforms($scope.gameSelected);
          $scope.setGameModes($scope.gameSelected);

          $scope.$evalAsync(function () {
            $scope.platformSelected = ($scope.platformOptions || []).find(p => p.id === post.id_platform) || $scope.platformSelected;
            $scope.gameModeSelected = ($scope.gameModeOptions || []).find(m => m.id === post.id_mode) || $scope.gameModeSelected;
          });

          $scope.$applyAsync();
        } catch (e) {
          console.log(e);
          if (popups && popups.alert) popups.alert("No se pudo cargar el anuncio para editar");
          $state.go('posts');
        }
      }


      $scope.submit = async function(form, game, platform, mode) {
        form.game = game;
        form.platform = platform;
        form.mode = mode;

        try {
          if ($scope.isEdit) {
            await posts.update($stateParams.id_post, form);
            popups.function("Anuncio actualizado con éxito", function () {
              $state.go('posts');
            });
          } else {
            await posts.save(form);
            popups.function("Anuncio creado con éxito", function () {
              $state.go('posts');
            });
          }
        } catch(error) {
          console.log(error);
          popups.alert("Ocurrió un error al guardar el anuncio");
        }
      };

      // INIT
      if ($scope.isEdit) {
        initEdit($stateParams.id_post);
      } else {
        initCreate();
      }

    }]);
