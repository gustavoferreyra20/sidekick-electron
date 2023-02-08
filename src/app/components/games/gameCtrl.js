angular.module('myAppGameCtrl', []).controller('gameCtrl', ['$scope', function($scope){

    getAllGames().then(
        function(response){
            $scope.games = response;
            $scope.$applyAsync();
        }
    )

    async function getAllGames (){
        return new Promise((resolve, reject) =>{
          const url = process.env.SIDEKICK_API + 'games';
          
          axios.get(url)
          .then((res) => {
            resolve(res.data)
          })
          .catch(function(error) {
            console.log(error);
          });
          })
        
      }
    
}]);

