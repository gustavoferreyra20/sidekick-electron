angular.module('myAppForgotPasswordCtrl', []).controller('forgotPasswordCtrl', ['$scope', 'auth', 'popups', function ($scope, auth, popups) {

    $scope.resetPassword = function (email) {
        let data = {
            email: email
        };

        auth.resetPassword(data).then(
            function (response) {
                console.log(response);
                popups.function("Revisa tu casilla de correo", function () {
                    window.location.href = "#/login";
                });
                // Handle the response as needed (e.g., display success message)
            },
            function (error) {
                console.error('Error resetting password:', error);
                // Handle the error (e.g., display error message)
            }
        );
    };
}]);