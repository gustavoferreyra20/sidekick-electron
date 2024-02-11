angular.module('myAppConfigCtrl', []).controller('configCtrl', ['$scope', 'popups', 'users', function ($scope, popups, users) {

  $scope.btnLogout = function () {
    ipcRenderer.invoke("logout");
  };

  $scope.btnChangePassword = function () {
    let checkPasswordContent = "<div class='form-group'>Ingrese su contraseña original:<input class='custom-input form-control' type='password' id='popupS-input'></div>"

    popups.prompt(checkPasswordContent)
      .then(function (originalPassword) {

        if (!originalPassword) return; // User canceled the operation

        // Verify the original password (You need to implement the logic for this)
        users.checkPassword(userSession.id, originalPassword).then(function (res) {
          if (res) {
            setTimeout(function () {
              let newPasswordContent = "<div class='form-group'>Ingrese su nueva contraseña:<input class='custom-input form-control is-required' required placeholder='**********'  type='password' id='popupS-input'> <p id='imagenHelp' class='form-text'>Su contraseña debe contener <b class='text-danger'>8</b>caracteres como mímimo.</p></div>"

              popups.prompt(newPasswordContent).then(function (newPassword) {

                if (!newPassword) return; // User canceled the operation

                if (newPassword.length < 8) {
                  setTimeout(function () {
                    popups.alert("Contraseña demasiado corta.");
                  }, 500);
                } else {
                  let data = {
                    password: newPassword
                  };

                  users.update(userSession.id, data).then(function () {
                    setTimeout(function () {
                      popups.function("Contraseña actualizada, cerrando sesión.", function () {
                        ipcRenderer.invoke("logout");
                      });

                    }, 500);
                  });
                }
              });
            }, 500);
          } else {
            setTimeout(function () {
              popups.alert("Contraseña incorrecta.");
            }, 500);
          }
        })
      });
  };
}]);