angular.module('myAppNotificationsCtrl', []).controller('notificationsCtrl', ['$scope', 'notifications', 'users', function ($scope, notifications, users) {
  const utils = require("./assets/scripts/utils");

  $scope.utils = utils;
  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  showNotifications();
  removeDot();

  function showNotifications() {
    users.getNotifications(userSession.id).then(
      function (response) {
        $scope.notifications = response;
        notifications.bulkUpdate("read");
        $scope.$applyAsync();
      }
    )
  }

  function removeDot() {
    var notificationTab = document.getElementById('notification-tab');
    var existingDot = document.getElementById('notification-dot');

    if (existingDot) {
      notificationTab.removeChild(existingDot);
    }
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

