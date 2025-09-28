angular.module('myAppStoreCtrl', ['myApp']).controller('storeCtrl', ['$scope', 'rewards', 'payments', 'API_BASE_URL', function ($scope, rewards, payments, API_BASE_URL) {

  $scope.API_BASE_URL = API_BASE_URL;
  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  rewards.getAll().then(
    function (response) {
      $scope.rewards = response;
      $scope.$applyAsync();
    }
  )

  $scope.btnBuy = async function (reward) {
    try {
      payments.newPaymentMP(reward.id_reward).then((res) => shell.openExternal(res.init_point));
    } catch (error) {
      console.error(error);
    }

  };
}]);