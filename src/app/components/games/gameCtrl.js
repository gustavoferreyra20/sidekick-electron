angular.module('myAppGameCtrl', []).controller('gameCtrl', ['$scope', 'games', function ($scope, games) {

  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  games.getAll().then(
    function (response) {
      $scope.games = response;
      $scope.$applyAsync();
    }
  )

}]);

