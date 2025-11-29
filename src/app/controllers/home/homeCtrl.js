angular.module('myAppHomeCtrl', ['myAppGameCtrl']).controller('homeCtrl', ['$scope', 'notificationStateService', 'posts', 'modes', 'games', 'platforms', 'popups', 'users', function ($scope, notificationStateService, posts, modes, games, platforms, popups, users) {

  $scope.utils = utils;
  $scope.SIDEKICK_API = process.env.SIDEKICK_API;
  $scope.hasNotifications = notificationStateService.hasNotifications();
  $scope.currentUserId = userSession.id;
  $scope.hasSearched = false;
  posts.getAll().then(
    function (response) {
      $scope.posts = response;
      $scope.$applyAsync();
    }
  )

  games.getOptions().then(function (response) {
    $scope.gameOptions = response;
    $scope.gameSelected = $scope.gameOptions[0];

    $scope.setPlatforms($scope.gameSelected);
    $scope.setModes($scope.gameSelected);
    $scope.$applyAsync();
  });

  $scope.setPlatforms = function (selectedGame) {
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

  $scope.setModes = function (selectedGame) {
    if (!selectedGame || !selectedGame.full) {
      $scope.modeOptions = [];
      $scope.modeSelected = null;
      return;
    }

    let game = selectedGame.full;

    // Excluir modo single-player
    $scope.modeOptions = (game.game_modes || []).filter(m => m.id !== 1);
    $scope.modeSelected = $scope.modeOptions[0] || null;

    $scope.$applyAsync();
  };

  $scope.btnSearchPost = function (game, platform, mode) {
    let params = {};

    params.id_game = game?.full?.id;
    params.id_platform = platform?.id;
    params.id_mode = mode?.id;
    posts.getAll(params).then(
      function (response) {
        $scope.posts = response;
        $scope.hasSearched = true;
        $scope.$applyAsync();
      }
    )

  };

  $scope.btnResetSearch = function () {
    // Reset search state
    $scope.hasSearched = false;

    // Reset game options
    games.getOptions().then(function (response) {
      $scope.gameOptions = response;
      $scope.gameSelected = $scope.gameOptions[0];

      $scope.setPlatforms($scope.gameSelected);
      $scope.setModes($scope.gameSelected);
      $scope.$applyAsync();
    });

    // Get all posts again
    posts.getAll().then(function (response) {
      $scope.posts = response;
      $scope.$applyAsync();
    });
  };

  $scope.btnSubmitApplication = async function (postId, postOwnerId) {
    try {

      if (userSession.id === postOwnerId) {
        return popups.alert("No puedes unirte a tus propios posts");
      }

      const applications = await users.getApplications('sent');

      if (applications.some(app => app.id_post === postId)) {
        return popups.alert("Ya existe una solicitud para este post");
      }

      await posts.addApplication(postId);
      popups.alert("Solicitud enviada correctamente");

    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      popups.alert("Ocurrió un error al enviar la solicitud");
    }
  };

  // Callback for searchable dropdown
  $scope.onGameSelect = function (selectedGame) {
    $scope.setPlatforms(selectedGame);
    $scope.setModes(selectedGame);
    if ($scope.hasSearched) {
      $scope.hasSearched = false;
    }
  };

  // Watch for changes in platform selection
  $scope.$watch('platformSelected', function (newValue, oldValue) {
    if (newValue !== oldValue && $scope.hasSearched) {
      $scope.hasSearched = false;
    }
  });

  // Watch for changes in mode selection
  $scope.$watch('modeSelected', function (newValue, oldValue) {
    if (newValue !== oldValue && $scope.hasSearched) {
      $scope.hasSearched = false;
    }
  });

}]);