angular.module('myAppConfigCtrl', []).controller('configCtrl', ['$scope', 'popups', 'users', function ($scope, popups, users) {

  $scope.btnLogout = function () {
    ipcRenderer.invoke("logout");
  };

  $scope.btnChangePassword = function () {
    let checkPasswordContent = `
    <div class="form-group mb-3">
      <label for="popupS-input" class="form-label">Ingrese su contraseña actual</label>
      <div class="position-relative">
        <input class="custom-input form-control" type="password" id="popupS-input" placeholder="**********">
        <i class="fa fa-eye password-toggle-icon" onclick="
          const input = document.getElementById('popupS-input');
          const icon = this;
          if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
          } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
          }
        "></i>
      </div>
    </div>
  `;

    popups.prompt(checkPasswordContent)
      .then(function (originalPassword) {

        if (!originalPassword) return; // User canceled the operation

        // Verify the original password (You need to implement the logic for this)
        users.checkPassword(userSession.id, originalPassword).then(function (res) {
          if (res) {
            setTimeout(function () {
              let newPasswordContent = `
                <div class="form-group mb-3">
                  <label for="popupS-input" class="form-label">Ingrese su nueva contraseña:</label>
                  <div class="position-relative">
                    <input class="custom-input form-control is-required" 
                           required 
                           placeholder="**********" 
                           type="password" 
                           id="popupS-input">
                    <i class="fa fa-eye password-toggle-icon" onclick="
                      const input = document.getElementById('popupS-input');
                      const icon = this;
                      if (input.type === 'password') {
                        input.type = 'text';
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                      } else {
                        input.type = 'password';
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                      }
                    "></i>
                  </div>
                  <p id="imagenHelp" class="form-text mt-2">
                    Su contraseña debe contener <b class="text-danger">8</b> caracteres como mínimo.
                  </p>
                </div>
              `;

              popups.prompt(newPasswordContent).then(function (newPassword) {

                if (!newPassword) return; // User canceled the operation

                if (newPassword.length < 8) {
                  setTimeout(function () {
                    popups.alert("La contraseña debe tener al menos 8 caracteres.");
                  }, 500);
                } else {
                  let data = {
                    password: newPassword
                  };

                  users.update(userSession.id, data).then(function () {
                    setTimeout(function () {
                      popups.function("Su contraseña ha sido actualizada correctamente. La sesión se cerrará por seguridad.", function () {
                        ipcRenderer.invoke("logout");
                      });

                    }, 500);
                  });
                }
              });
            }, 500);
          } else {
            setTimeout(function () {
              popups.alert("La contraseña ingresada es incorrecta. Vuelva a intentarlo.");
            }, 500);
          }
        })
      });
  };
}]);