angular.module('myAppHomeCtrl', ['myAppgameCtrl']).controller('homeCtrl', ['$scope', 'posts', 'modes', 'games', 'platforms', 'popups', function ($scope, posts, modes, games, platforms, popups) {
  posts.getAll().then(
    function (response) {
      $scope.posts = response;
      $scope.$applyAsync();
    }
  )

  games.getOptions(false).then(function (response) {
    $scope.gameOptions = response;
    $scope.gameSelected = $scope.gameOptions[0];

    $scope.setPlatforms();
    $scope.$applyAsync();
  });

  modes.getOptions(true).then(function (response) {
    $scope.modeOptions = response;
    $scope.modeSelected = $scope.modeOptions[0];

    $scope.$applyAsync();
  });

  $scope.setPlatforms = function (arg = null) {
    var game;

    if (arg != null) {
      game = (arg.value != 'any') ? arg.value : null;
    } else {
      game = arg;
    }

    platforms.getOptions(game, true).then(function (response) {
      $scope.platformOptions = response;
      $scope.platformSelected = $scope.platformOptions[0];

      $scope.$applyAsync();
    });

  };

  $scope.btnSearchPost = function (game, platform, mode) {
    let params = {};

    if (game.value != 'any') {
      params.id_game = game.value;
    }

    if (platform.value != 'any') {
      params.id_platform = platform.value;
    }

    if (mode.value != 'any') {
      params.id_mode = mode.value;
    }

    posts.getAll(params).then(
      function (response) {
        $scope.posts = response;
        $scope.$applyAsync();
      }
    )

  };

  $scope.btnSubmitApplication = function (id_post) {
    posts.getApplications({ id_post: id_post, id_user: userSession.id_user, type: 'sended' })
      .then((res) => {
        if (res[0]) {
          popups.alert("Ya existe una solicitud pendiente");
        } else {
          posts.addApplication({ id_post: id_post, id_user: userSession.id_user })
            .then(popups.alert("Solicitud enviada"));
        }

      })
  };

}]);