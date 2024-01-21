angular.module('myAppNotificationsCtrl', []).controller('notificationsCtrl', ['$scope', 'notifications', function ($scope, notifications) {

  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  showNotifications();

  function showNotifications() {
    notifications.getAll().then(
      function (response) {
        $scope.notifications = response;
        notifications.bulkUpdate("read");
        $scope.$applyAsync();
      }
    )
  }


  $scope.btnDeleteNotification = function (id_notification) {
    var index = -1;
    for (var i = 0; i < $scope.notifications.length; i++) {
      if ($scope.notifications[i].id_notification === id_notification) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      $scope.notifications.splice(index, 1);
    }


    notifications.remove(id_notification);
  }
}]);

