angular.module('myAppProfileCtrl', []).controller('profileCtrl', ['$scope', 'reviews', 'users', '$stateParams', function ($scope, reviews, users, $stateParams) {

  var id_profile = ($stateParams.id_user === undefined) ? userSession.id_user : $stateParams.id_user;

  users.get({ id_user: id_profile }).then(
    function (user) {

      reviews.getAvg({ id_user: user[0].id_user }).then(
        function (response) {

          var profile = {
            name: user[0].name,
            description: user[0].description,
            ability: (response[0].abilityScore === undefined) ? 0 : Math.round(response[0].abilityScore),
            karma: (response[0].karmaScore === undefined) ? 0 : Math.round(response[0].karmaScore),
            isCurrentUser: $stateParams.id_user === undefined,
            img: user[0].img
          };

          $scope.profile = profile;
          $scope.$applyAsync();

        }
      )
    }
  )

  reviews.getAll({ id_user: id_profile }).then(
    function (reviews) {
      $scope.reviews = reviews;
      $scope.$applyAsync();
    }
  )
}]);