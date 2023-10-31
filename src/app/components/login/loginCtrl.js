angular.module('myAppLoginCtrl', []).controller('loginCtrl', ['$scope', 'auth', function($scope, auth){
  $scope.login = function(form){
    auth.login(form)
   };  
}]);

