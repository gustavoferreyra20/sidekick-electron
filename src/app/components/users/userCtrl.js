angular.module('myAppUserCtrl', []).controller('userCtrl', ['$scope', function($scope){

  $scope.checkSession = function(){
      return userSession;
  }

  }]);