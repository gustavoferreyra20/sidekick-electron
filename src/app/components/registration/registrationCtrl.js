angular.module('myAppRegistrationCtrl', []).controller('registrationCtrl', ['$scope', 'auth', 'users', 'popups', 'contact_inf', 'API_BASE_URL',
  function ($scope, auth, users, popups, contact_inf, API_BASE_URL) {

  $scope.showTerms = function () { popups.alert('Al usar nuestro servicio, aceptas cumplir con nuestros términos y condiciones. Esto incluye el respeto a la privacidad y el cumplimiento de las leyes aplicables. Nos reservamos el derecho de realizar cambios en cualquier momento. Gracias por tu comprensión y cooperación.') };

  $scope.btnRegister = function (form) {

    if (form.password !== form.passwordConfirm) {
      popups.alert("Las contraseñas no coinciden. Por favor, verifica que sean iguales.");
      return; // Do not proceed: passwords must match
    }

    if (form.password.length < 8) {
      popups.alert("La contraseña debe tener al menos 8 caracteres.");
      return; // Don't proceed if the password is too short
    }

    const registerUser = auth.register(form);
    const fileInput = document.getElementById('file');
    const fileToUpload = fileInput ? fileInput.files[0] : null;

    if (fileToUpload) {
      const saveImagePromise = registerUser.then(function (user) {
        const contactInfoPromises = $scope.contact_inf_list.map(element => {
          return users.addContact_inf_list(user.id_user, element.platform.id_contact_inf, element.account);
        });

        return Promise.all(contactInfoPromises).then(() => {
          return saveImage(fileToUpload, user.id_user, API_BASE_URL);
        });
      });

      saveImagePromise
        .then(function () {
          popups.function("Usuario registrado con éxito", function () {
            location.reload();
          });
        })
        .catch(function (error) {
          console.error("Error en registro o subida de imagen:", error);
        });
    } else {
      // Just register the user and add contact info without saving an image
      registerUser
        .then(function (user) {
          const contactInfoPromises = $scope.contact_inf_list.map(element => {
            return users.addContact_inf_list(user.id_user, element.platform.id_contact_inf, element.account);
          });

          return Promise.all(contactInfoPromises);
        })
        .then(function () {
          popups.function("Usuario registrado con éxito", function () {
            location.reload();
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

    $scope.previewFile = function(file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.onload = function() {
            // Validar dimensiones mínimas
            if (img.width >= 250 && img.height >= 250) {
              $scope.$apply(() => {
                $scope.previewSrc = e.target.result;
              });
            } else {
              popups.alert("La imagen debe tener al menos 250x250 px");
              const input = document.getElementById('file');
              if (input) input.value = null;
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

  $scope.removePhoto = function() {
    $scope.previewSrc = null;

    const input = document.getElementById('file');
    if (input) input.value = null;
  };


  $scope.btnAddAccount = function () {
    $scope.contact_inf_list.push({ platform: $scope.contactOptions[0], account: '' });

    $scope.$applyAsync();
  }

  $scope.btnRemoveLast = function () {
    $scope.contact_inf_list.pop();
    $scope.$applyAsync();
  }

  contact_inf.getAll().then(function (response) {
    $scope.contactOptions = response;
    $scope.contact_inf_list = [{ platform: $scope.contactOptions[0], account: '' }];

    $scope.$applyAsync();
  })

}]);

async function saveImage(file, id_user, API_BASE_URL) {
  return new Promise((resolve, reject) => {
    const url = API_BASE_URL + '/images/' + id_user;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", id_user);

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(() => resolve())
      .catch(err => {
        console.error("Error al subir imagen:", err);
        reject(err);
      });
  });
}