angular.module('myAppGameCtrl', ['myApp']).controller('gameCtrl', ['$scope', 'games', 'API_BASE_URL', function ($scope, games, API_BASE_URL) {

  $scope.API_BASE_URL = API_BASE_URL;
  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  games.getAll().then(
    function (response) {
      $scope.games = response;
      $scope.$applyAsync();
    }
  )

}]);

