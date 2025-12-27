angular.module('myAppPostListCtrl', [])
  .controller('postListCtrl', ['$scope', 'posts', 'popups', function ($scope, posts, popups) {

    $scope.items = [];
    $scope.loading = true;

    $scope.load = async function () {
      $scope.loading = true;

      try {
        const data = await posts.getByUser(userSession.id);
        $scope.items = Array.isArray(data) ? data : [];
      } catch (e) {
        console.log(e);
        if (popups && popups.alert) popups.alert("Ocurrió un error al cargar los anuncios");
      } finally {
        $scope.loading = false;
        $scope.$applyAsync();
      }
    };

    $scope.removePost = function (id_post) {
      popups.confirm("Seguro desea eliminar el post?", async function () {
        try {
          await posts.remove(id_post);

          $scope.$applyAsync(function () {
            $scope.items = $scope.items.filter(p => p.id_post !== id_post);
          });

        } catch (e) {
          console.log(e);
          if (popups && popups.alert) popups.alert("Ocurrió un error al eliminar el anuncio");
        }
      });
    };

    $scope.load();
  }]);
