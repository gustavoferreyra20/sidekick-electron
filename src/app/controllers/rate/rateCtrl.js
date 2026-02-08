angular.module('myAppRateCtrl', []).controller('rateCtrl', ['$scope', '$stateParams', '$state', 'posts', 'reviews', 'rewards', 'popups', 'users', 'API_BASE_URL', function ($scope, $stateParams, $state, posts, reviews, rewards, popups, users, API_BASE_URL) {

  $scope.API_BASE_URL = API_BASE_URL;
  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  $scope.newReview = function (review) {
    review.id_post = $stateParams.id_post;

    var id_user = $stateParams.id_user;
    var id_application = $stateParams.id_application;

    var rewardId = review.reward ? review.reward.id_reward : null;
    if (rewardId) review.reward = rewardId;

    users.addReview(id_user, review)
      .then(function (res) {
        return posts.updateApplication(review.id_post, id_application, 'complete')
          .then(function () { return res; });
      })
      .then(function (res) {
        return rewardId ? reviews.addReward(res.reviewId, rewardId) : null;
      })
      .then(function () {
        popups.alert("Calificacion enviada");
        return $state.go('applications', {}, { reload: true });
      })
      .catch(function (err) {
        console.error(err);
        popups.alert("Error enviando calificación");
      });
  };

  $scope.btnAddReward = function (form) {

    if (!$scope.rewards && !form.reward) {
      showRewards(form);
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