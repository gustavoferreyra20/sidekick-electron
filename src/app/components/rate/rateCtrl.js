angular.module('myAppRateCtrl', []).controller('rateCtrl', ['$scope', '$stateParams', 'posts', 'reviews', 'rewards', 'popups', 'users', function ($scope, $stateParams, posts, reviews, rewards, popups, users) {

  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  $scope.newReview = function (review) {
    review.id_post = $stateParams.id_post;


    if (review.reward != undefined) review.reward = review.reward.id_reward;

    users.addReview($stateParams.id_user, review)
      .then(posts.updateApplication(review.id_post, $stateParams.id_application, 'reviewed'))
      .then(function (res) {

        if (review.reward != undefined) {
          reviews.addReward(res.reviewId, review.reward)
        }

      })
      .then(popups.alert("Calificacion enviada"))
      .then(window.location.href = "#/applications");
  };

  $scope.btnAddReward = function (form) {
    if (!$scope.rewards && !form.reward) {
      showRewards();
    } else {
      $scope.rewards = null;
      $scope.$applyAsync();
    }
  };

  $scope.btnSelectReward = function (form, reward) {
    form.reward = reward;
    $scope.rewards = null;
    $scope.$applyAsync();
    return form
  };

  $scope.btnDeleteReward = function (form) {
    form.reward = null;
    $scope.rewards = $scope.stockedRewards;
    $scope.$applyAsync();
    return form;
  };

  $scope.btnGoToStore = function () {
    window.location.href = "#/store"
  };

  function showRewards() {
    if ($scope.stockedRewards) {
      $scope.rewards = $scope.stockedRewards;
      $scope.$applyAsync();
    } else {
      users.getRewards(userSession.id).then(
        function (response) {
          $scope.rewards = response;
          $scope.stockedRewards = response;
          $scope.$applyAsync();
        }
      )
    }
  }
}]);