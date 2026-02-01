angular.module('myAppApplicationCtrl', []).controller('applicationCtrl', ['$scope', 'posts', 'popups', 'users', function ($scope, posts, popups, users) {

  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  showReceivedApps();

  $scope.showSentApps = function () { showSentApps() };

  $scope.showReceivedApps = function () { showReceivedApps() };

  $scope.changeStatus = function (id_post, id_application, status) {
    posts.updateApplication(id_post, id_application, status)
      .then(showReceivedApps);
  };

  $scope.contact = function(id_post) {
    if (window.SidekickChat) {
      window.SidekickChat.open(id_post);
    } else {
      console.error("Chat is not loaded");
    }
  };


  function showSentApps() {
    users.getApplications('sent').then(function (apps) {
      $scope.applications = apps;
      $scope.posts = [];
      $scope.$applyAsync();
    });
  }

  function showReceivedApps() {
    users.getApplications('received').then(function (posts) {
      $scope.posts = posts;
      $scope.applications = [];
      $scope.$applyAsync();
    })
  }

  $scope.btnCancelApplication = function (id_post, id_application) {
    popups.confirm("Seguro desea eliminar la solicitud?", function () { (posts.removeApplication(id_post, id_application).then(showSentApps)) })
  }

  $scope.btnDeletePost = function (id_post) {
    popups.confirm("Seguro desea eliminar el post?", function () { (posts.remove(id_post).then(showReceivedApps)) })
  }
}]);