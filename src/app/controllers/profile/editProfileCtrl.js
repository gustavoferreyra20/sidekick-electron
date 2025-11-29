angular.module('myAppEditProfileCtrl', [])
  .controller('editProfileCtrl', function ($scope, users, popups, API_BASE_URL, DEFAULT_PHOTO_URL) {

    const id = userSession.id;
    $scope.API_BASE_URL = API_BASE_URL;

    // estado foto / preview
    $scope.previewSrc = null;
    $scope.newFile = null;
    $scope.removePhotoFlag = false;

    users.get(id).then(user => {

      const photoUrl = user.img || DEFAULT_PHOTO_URL;

      $scope.user = {
        id_user: id,
        name: user.name,
        description: user.description,
        photo_url: photoUrl,
        isDefaultPhoto: photoUrl === DEFAULT_PHOTO_URL
      };

      $scope.$applyAsync();
    });


    // Preview de imagen
    $scope.previewFile = function (file) {
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {

          if (img.width >= 250 && img.height >= 250) {
            $scope.$apply(() => {
              $scope.previewSrc = e.target.result;
              $scope.newFile = file;
              $scope.removePhotoFlag = false;
              $scope.user.isDefaultPhoto = false;
            });
          } else {
            popups.alert("La imagen debe tener al menos 250x250 px");
            const input = document.getElementById('photo');
            if (input) input.value = null;
          }

        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };


    // Eliminar foto / restablecer default
    $scope.removePhoto = function () {
      $scope.previewSrc = null;
      $scope.newFile = null;
      $scope.removePhotoFlag = true;

      $scope.user.photo_url = DEFAULT_PHOTO_URL;
      $scope.user.isDefaultPhoto = true;

      const input = document.getElementById('photo');
      if (input) input.value = null;
    };


    $scope.save = async function () {
      try {

        await users.update(id, {
          name: $scope.user.name,
          description: $scope.user.description
        });

        // 2) Si borró la foto y no subió una nueva
        if ($scope.removePhotoFlag && !$scope.newFile) {
          await users.update(id, {img: DEFAULT_PHOTO_URL});
        }

        // 3) Si subió nueva foto
        if ($scope.newFile) {
          if (typeof saveImage === 'function') {
            await saveImage($scope.newFile, id, API_BASE_URL);
          } else {
            const formData = new FormData();
            formData.append('file', $scope.newFile);
            formData.append('userId', id);

            await fetch(API_BASE_URL + '/images/' + id, {
              method: 'POST',
              body: formData
            });
          }
        }

        window.location.href = "#/profile?id_user=" + id;

      } catch (err) {
        console.error("Error guardando perfil:", err);
        popups.alert("Ocurrió un error al guardar los cambios.");
      }
    };

  });
