angular.module('myAppForgotPasswordCtrl', []).controller('forgotPasswordCtrl', ['$scope', 'auth', 'popups', function ($scope, auth, popups) {

    $scope.resetPassword = function (email) {
        let data = {
            email: email
        };

        auth.resetPassword(data).then(
            function (response) {
                popups.function("si el correo coincide te llegara un email", function () {
                    window.location.href = "#/login";
                });
            },
            function (error) {
                console.error('Error resetting password:', error);
            }
        );
    };
}]);