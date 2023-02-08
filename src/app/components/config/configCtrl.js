angular.module('myAppConfigCtrl', []).controller('configCtrl', ['$scope', function($scope){
  
    $scope.btnLogout = function(){
        userController.logout(userSession.token).then(ipcRenderer.invoke("logout"))       
      };  
}]);