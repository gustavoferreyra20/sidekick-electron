angular.module('myAppStoreCtrl', []).controller('storeCtrl', ['$scope', function($scope){
  
    rewardController.getAllRewards().then(
        function(response){
            $scope.rewards = response;
            $scope.$applyAsync();
        }
      )
    
      $scope.btnBuy = async function(reward){
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
          items: [
            {
              title: reward.name,
              description: reward.description,
              picture_url: "http://www.myapp.com/myimage.jpg",
              category_id: "reward",
              quantity: 1,
              unit_price: reward.price
            }
          ],
          //notification_url: process.env.SIDEKICK_API + 'payments'
        };
    
        axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
          }
        })
        .then((res) => {
          shell.openExternal(res.data.init_point)
        })
        .catch(function(error) {
          console.log(error);
        });
    
      };
}]);