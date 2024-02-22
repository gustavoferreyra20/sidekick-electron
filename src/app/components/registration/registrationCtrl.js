angular.module('myAppRegistrationCtrl', []).controller('registrationCtrl', ['$scope', 'auth', 'users', 'popups', 'contact_inf', function ($scope, auth, users, popups, contact_inf) {

  $scope.showTerms = function () { popups.alert('Al usar nuestro servicio, aceptas cumplir con nuestros términos y condiciones. Esto incluye el respeto a la privacidad y el cumplimiento de las leyes aplicables. Nos reservamos el derecho de realizar cambios en cualquier momento. Gracias por tu comprensión y cooperación.') };

  $scope.btnRegister = function (form) {
    if (form.password.length < 8) {
      popups.alert("Contraseña demasiado corta");
      return; // Don't proceed if the password is too short
    }

    const registerUser = auth.register(form);

    if (file.files[0]) {
      // Save the image and add contact info if there is a file
      const saveImagePromise = registerUser.then(function (user) {
        const contactInfoPromises = $scope.contact_inf_list.map(element => {
          return users.addContact_inf_list(user.id_user, element.platform.id_contact_inf, element.account);
        });

        return Promise.all(contactInfoPromises).then(() => saveImage(file, user.id_user));
      });

      saveImagePromise
        .then(function () {
          popups.function("Usuario registrado con éxito", function () {
            location.reload();
          });
        })
        .catch(function (error) {
          console.error(error);
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

async function saveImage(file, id_user) {
  return new Promise((resolve, reject) => {
    const url = process.env.SIDEKICK_API + 'images/' + id_user;
    const formData = new FormData();
    formData.append("file", file.files[0]);
    formData.append("userId", id_user);

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(() => {
        resolve();
      })
      .catch(console.error);
  });
}