angular.module('myAppNotificationStateService', [])
    .service('notificationStateService', ['notifications', '$http', '$q', '$interval', 'users', function (notifications, $http, $q, $interval, users) {
        var hasNotifications = false;

        // Function to check for new notifications
        var checkNotifications = function () {
            users.getNotifications(userSession.id)
                .then(function (response) {
                    hasNotifications = response.filter(notification => notification.status === 'unread').length > 0;

                    if (hasNotifications) {
                        var notificationTab = document.getElementById('notification-tab');

                        var existingDot = document.getElementById('notification-dot');

                        if (!existingDot && notificationTab) {
                            var dotSpan = document.createElement('span');
                            dotSpan.className = 'dot';
                            dotSpan.id = 'notification-dot';

                            notificationTab.appendChild(dotSpan);
                        }
                    } else {
                        var notificationTab = document.getElementById('notification-tab');
                        var existingDot = document.getElementById('notification-dot');

                        if (existingDot) {
                            notificationTab.removeChild(existingDot);
                        }
                    }

                })
                .catch(function (error) {
                    console.error('Error checking notifications:', error);
                });
        };

        // Start polling for notifications every 5 seconds
        var intervalPromise = $interval(checkNotifications, 5000);

        // Cancel the interval when the service is destroyed
        //$interval.cancel(intervalPromise);

        return {
            hasNotifications: function () {
                return hasNotifications;
            },
            setNotifications: function (value) {
                hasNotifications = value;
            },
            toggleNotifications: function () {
                hasNotifications = !hasNotifications;
            }
        };
    }]);