angular.module('myAppgameCtrl', []).controller('gameCtrl', ['$scope', 'games', function($scope, games){

  games.getAll().then(
    function(response){
        $scope.games = response;
        $scope.$applyAsync();
    }
)
    
}]);

