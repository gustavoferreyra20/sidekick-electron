angular.module('myAppStoreCtrl', []).controller('storeCtrl', ['$scope', 'rewards', 'payments', function ($scope, rewards, payments) {

  $scope.SIDEKICK_API = process.env.SIDEKICK_API;

  rewards.getAll().then(
    function (response) {
      $scope.rewards = response;
      $scope.$applyAsync();
    }
  )

  $scope.btnBuy = async function (reward) {
    try {
      payments.newPayment(reward).then((res) => shell.openExternal(res.init_point));
    } catch (error) {
      console.error(error);
    }

  };
}]);