angular.module('myAppRegistrationCtrl', []).controller('registrationCtrl', ['$scope', 'users', 'popups', 'contact_inf', function ($scope, users, popups, contact_inf) {

  $scope.showTerms = function () { popups.alert('Lorem') };
  
  $scope.btnRegister = function (form) {

    let conditions = {
      email: form.email
    }

    users.get(conditions)
      .then(function (existentUser) {

        if (form.password.length < 8) {
          popups.alert("Contraseña demasiado corta")
        } else if (existentUser.length > 0) {
          popups.alert("Usuario existente")
        } else if (file.files[0]) {
          saveImage(file).then((res) => {
            form.img = `profiles/${res.filename}`;
            return form;
          }).then((newUser) => {
            saveUser(newUser);
          })
        } else {
          newUser = form;
          saveUser(newUser);
        }

      })
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

  async function saveUser(user) {
    users.save(user)
      .then(function (id_createdUser) {
        return users.addContact_inf_list({ id_user: id_createdUser, contact_inf_list: $scope.contact_inf_list });
      })
      .then(function () {
        popups.function("Usuario registrado con exito", function () { (location.reload()) });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}]);

async function saveImage(file) {
  return new Promise((resolve, reject) => {
    // endpoint
    const url = process.env.SIDEKICK_API + 'imageupload';
    const formData = new FormData();
    formData.append("file", file.files[0]);

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data)
      }).catch(console.error)
  })
}