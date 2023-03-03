angular.module('myAppApplicationCtrl', []).controller('applicationCtrl', ['$scope', 'posts', 'popups', function($scope, posts, popups){
  
    showReceivedApp();

    $scope.showSentApp = function(){showSentApp()};

    $scope.showReceivedApp = function(){showReceivedApp()}; 

    $scope.changeStatus = function(id_user, id_post, status){
      posts.addApplication({id_user: id_user, id_post: id_post, status: status})
      .then(showReceivedApp());
    }; 

    $scope.showTerms = function(){popups.alert('Lorem')}; 

    function showSentApp(){
      posts.getApplications({id_user: userSession.id_user, type: 'sended'}).then(function(apps){
        $scope.applications = apps;
        $scope.posts = [];
        $scope.$applyAsync();
    });
    }

    function showReceivedApp(){
      posts.getApplications({id_user: userSession.id_user, type: 'received'}).then(function(posts){
        $scope.posts = posts;
        $scope.applications = [];
        $scope.$applyAsync();
      })
    }

    $scope.btnCancelApplication = function(id_post){
      popups.confirm("Seguro desea eliminar la solicitud?", function (){ (posts.removeApplication(id_post, userSession.id_user).then(showSentApp()))})
    }

    $scope.btnDeletePost = function(id_post){
      popups.confirm("Seguro desea eliminar el post?", function (){ (posts.remove(id_post).then(showReceivedApp()))})
    }
}]);