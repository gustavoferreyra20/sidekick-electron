angular.module('myAppGameCtrl', ['myApp'])
  .controller('gameCtrl', ['$scope', 'games', 'API_BASE_URL', '$timeout', function ($scope, games, API_BASE_URL, $timeout) {

    $scope.API_BASE_URL = API_BASE_URL;
    $scope.SIDEKICK_API = process.env.SIDEKICK_API;

    // Wait for ng-init to set values, then load games
    $timeout(function() {
      // Default values
      var limit = $scope.limit || 10;
      var offset = $scope.offset || 0;
      var sortBy = $scope.sortBy || 'updated_at';
      var sortOrder = $scope.sortOrder || 'desc';

      games.getAll(limit, offset, sortBy, sortOrder).then(
        function (response) {
          $scope.games = response;
          $scope.$applyAsync();
        }
      )
    }, 0);

  }]);

