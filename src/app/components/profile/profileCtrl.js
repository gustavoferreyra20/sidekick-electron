angular.module('myAppProfileCtrl', []).controller('profileCtrl', ['$scope', 'reviews', 'users', function($scope, reviews, users){
  
  users.get({id_user: userSession.id_user}).then(
        function(user) {
            
          reviews.getAvg({id_user: user[0].id_user}).then(
                function(response) {

                  var profile = {
                    name: user[0].name,
                    description: user.description,
                    ability: (response[0].abilityScore === undefined ) ? 0 : Math.round(response[0].abilityScore),
                    karma: (response[0].karmaScore === undefined ) ? 0 : Math.round(response[0].karmaScore)
                  };

                  $scope.profile = profile;
                  $scope.$applyAsync();
    
                }
              )
        }
      )

      reviews.getAll({id_user: userSession.id_user}).then(
      function(reviews){
        $scope.reviews = reviews;
        $scope.$applyAsync();
      }
      )
}]);