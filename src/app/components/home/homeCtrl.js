angular.module('myAppHomeCtrl', ['myAppGameCtrl']).controller('homeCtrl', ['$scope', 'notificationStateService', 'posts', 'modes', 'games', 'platforms', 'popups', 'users', function ($scope, notificationStateService, posts, modes, games, platforms, popups, users) {
  const utils = require("./assets/scripts/utils");

  $scope.utils = utils;
  $scope.SIDEKICK_API = process.env.SIDEKICK_API;
  $scope.hasNotifications = notificationStateService.hasNotifications();
  posts.getAll().then(
    function (response) {
      $scope.posts = response;
      $scope.$applyAsync();
    }
  )

  games.getOptions(true).then(function (response) {
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
    users.getApplications('sent')
      .then((res) => {
        if (res.some((item) => item.id_user === userSession.id)) {
          popups.alert("No puedes unirte a tus posts");
        } else if (res.some((item) => item.id_post === id_post)) {
          popups.alert("Ya existe una solicitud");
        } else {
          posts.addApplication(id_post)
            .then(() => popups.alert("Solicitud enviada"));
        }
      })
  };

}]);