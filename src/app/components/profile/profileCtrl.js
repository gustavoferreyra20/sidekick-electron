angular.module('myAppProfileCtrl', []).controller('profileCtrl', ['$scope', 'users', '$stateParams', function ($scope, users, $stateParams) {

  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  var id_profile = ($stateParams.id_user === undefined) ? userSession.id : $stateParams.id_user;

  users.get(id_profile).then(
    function (user) {

      users.getStats(id_profile).then(
        function (response) {

          var profile = {
            name: user.name,
            description: user.description,
            ability: (response[0].abilityScore === undefined) ? 0 : Math.round(response[0].abilityScore),
            karma: (response[0].karmaScore === undefined) ? 0 : Math.round(response[0].karmaScore),
            isCurrentUser: id_profile == userSession.id,
            img: user.img
          };

          $scope.profile = profile;
          $scope.$applyAsync();

        }
      )
    }
  )

  users.getReviews(id_profile).then(
    function (reviews) {
      $scope.reviews = reviews;
      $scope.$applyAsync();
    }
  )
}]);