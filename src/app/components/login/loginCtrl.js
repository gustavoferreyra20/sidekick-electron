angular.module('myAppLoginCtrl', []).controller('loginCtrl', ['$scope', 'users', function($scope, users){
  $scope.login = function(form){
    users.login(form)
   };  
}]);

