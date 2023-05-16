angular.module('myAppConfigCtrl', []).controller('configCtrl', ['$scope', 'users', function($scope, users){
  
    $scope.btnLogout = function(){
      users.logout()
        .then(ipcRenderer.invoke("logout"))       
      };  
}]);