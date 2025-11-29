angular.module('myAppChangePasswordCtrl', [])
  .controller('changePasswordCtrl', ['$scope', 'users', 'popups', function ($scope, users, popups) {

    $scope.form = {
      currentPassword: "",
      newPassword: ""
    };

    // Estado interno compartido
    let passwordsVisible = false;

    $scope.toggleVisibility = function () {

      passwordsVisible = !passwordsVisible;

      const fields = [
        {id: "currentPassword", icon: "icon-currentPassword"},
        {id: "newPassword", icon: "icon-newPassword"}
      ];

      fields.forEach(f => {
        const input = document.getElementById(f.id);
        const icon = document.getElementById(f.icon);

        if (!input || !icon) return;

        input.type = passwordsVisible ? "text" : "password";

        // cambiar icono
        if (passwordsVisible) {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      });

    };

    $scope.submit = function () {

      if ($scope.form.newPassword.length < 8) {
        popups.alert("La nueva contraseña debe tener al menos 8 caracteres.");
        return;
      }

      if ($scope.form.currentPassword === $scope.form.newPassword) {
        popups.alert("La nueva contraseña no puede ser igual a la actual.");
        return;
      }

      users.checkPassword(userSession.id, $scope.form.currentPassword)
        .then(function (isValid) {

          if (!isValid) {
            popups.alert("La contraseña actual es incorrecta.");
            return;
          }

          let data = {password: $scope.form.newPassword};

          users.update(userSession.id, data).then(function () {
            popups.function("Su contraseña ha sido cambiada correctamente. La sesión se cerrará por seguridad.", function () {
              ipcRenderer.invoke("logout");
            });
          });

        });

    };

  }]);
