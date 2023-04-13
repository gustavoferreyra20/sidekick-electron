angular.module('myAppRateCtrl', []).controller('rateCtrl', ['$scope', '$stateParams', 'posts', 'reviews', 'rewards', 'popups', function ($scope, $stateParams, posts, reviews, rewards, popups) {

  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  $scope.newReview = function (review) {
    review.id_user = $stateParams.id_user;
    review.id_post = $stateParams.id_post;
    review.id_writerUser = userSession.id_user
    if (review.reward != undefined) review.reward = review.reward.id_reward;
    reviews.save(review)
      .then(posts.addApplication({ id_user: review.id_user, id_post: review.id_post, status: 'reviewed' }))
      .then(function () { if (review.reward != undefined) rewards.use(review.reward) })
      .then(popups.alert("Calificacion enviada"))
      .then(window.location.href = "#/applications");
  };

  $scope.btnAddReward = function () {
    showRewards()
  };

  $scope.btnSelectReward = function (form, reward) {
    form.reward = reward;
    $scope.rewards = [];
    $scope.$applyAsync();
    return form
  };

  $scope.btnDeleteReward = function (form) {
    form.reward = '';
    showRewards();
    return form;
  };

  $scope.btnGoToStore = function () {
    window.location.href = "#/store"
  };

  function showRewards() {
    rewards.getByUser(userSession.id_user).then(
      function (response) {
        $scope.rewards = response;
        $scope.$applyAsync();
      }
    )
  }
}]);