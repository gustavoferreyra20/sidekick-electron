angular.module('myAppConfigCtrl', []).controller('configCtrl', ['$scope', function ($scope) {

  $scope.btnLogout = function () {
    ipcRenderer.invoke("logout");
  };

}]);