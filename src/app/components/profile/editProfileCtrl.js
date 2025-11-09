angular.module('myAppEditProfileCtrl', [])
  .controller('editProfileCtrl', function ($scope, users, popups) {

    const id = userSession.id;

    users.get(id).then(user => {
      $scope.user = {
        name: user.name,
        description: user.description
      };
      $scope.$applyAsync();
    });

    $scope.save = function () {

      const data = {
        name: $scope.user.name,
        description: $scope.user.description
      };

      users.update(id, data).then(() => {
        window.location.href = "#/profile?id_user=" + id;
      });
    };

  });
