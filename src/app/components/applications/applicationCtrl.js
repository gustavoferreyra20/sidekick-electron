angular.module('myAppApplicationCtrl', []).controller('applicationCtrl', ['$scope', 'posts', 'popups', function ($scope, posts, popups) {
  
  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  showReceivedApps();

  $scope.showSendedApps = function () { showSendedApps() };

  $scope.showReceivedApps = function () { showReceivedApps() };

  $scope.changeStatus = function (id_user, id_post, status) {
    posts.addApplication({ id_user: id_user, id_post: id_post, status: status })
      .then(showReceivedApps);
  };

  function showSendedApps() {
    posts.getApplications({ id_user: userSession.id_user, type: 'sended' }).then(function (apps) {
      $scope.applications = apps;
      $scope.posts = [];
      $scope.$applyAsync();
    });
  }

  function showReceivedApps() {
    posts.getApplications({ id_user: userSession.id_user, type: 'received' }).then(function (posts) {
      $scope.posts = posts;
      $scope.applications = [];
      $scope.$applyAsync();
    })
  }

  $scope.btnCancelApplication = function (id_post) {
    popups.confirm("Seguro desea eliminar la solicitud?", function () { (posts.removeApplication(id_post, userSession.id_user).then(showSendedApps)) })
  }

  $scope.btnDeletePost = function (id_post) {
    popups.confirm("Seguro desea eliminar el post?", function () { (posts.remove(id_post).then(showReceivedApps)) })
  }
}]);