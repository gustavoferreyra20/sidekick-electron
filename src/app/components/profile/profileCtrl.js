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
            ability: (response[0].abilityscore === undefined) ? 0 : Math.round(response[0].abilityscore),
            karma: (response[0].karmascore === undefined) ? 0 : Math.round(response[0].karmascore),
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

      // Initialize an object to store the rewards count
      let rewardsCount = {};

      // Iterate through the reviews array
      reviews.forEach(review => {
        // Iterate through the rewards of each review
        review.rewards.forEach(reward => {
          // Check if the reward's img exists in rewardsCount
          if (rewardsCount.hasOwnProperty(reward.img)) {
            // Increment the count if the reward already exists
            rewardsCount[reward.img]++;
          } else {
            // Initialize the count to 1 if the reward is encountered for the first time
            rewardsCount[reward.img] = 1;
          }
        });
      });

      // Initialize an array to store the result
      let totalRewards = [];

      // Iterate through the rewardsCount object and push each reward and its count to totalRewards
      for (let reward in rewardsCount) {
        totalRewards.push({ img: reward, amount: rewardsCount[reward] });
      }

      // Assign the total rewards to $scope
      $scope.totalRewards = totalRewards;
      $scope.$applyAsync();
    }
  )
}]);