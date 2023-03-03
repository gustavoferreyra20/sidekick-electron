angular.module('myAppConfigCtrl', []).controller('configCtrl', ['$scope', 'users', function($scope, users){
  
    $scope.btnLogout = function(){
      users.logout(userSession.token)
        .then(ipcRenderer.invoke("logout"))       
      };  
}]);