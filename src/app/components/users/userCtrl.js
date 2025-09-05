angular.module('myAppUserCtrl', []).controller('userCtrl', ['$scope', function($scope){

  $scope.checkSession = function() {
    return userSession && typeof userSession.token === 'string' && userSession.token.length > 0;
  }

  }]);