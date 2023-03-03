angular.module('myAppRegistrationCtrl', []).controller('registrationCtrl', ['$scope', 'users', 'popups', function($scope, users, popups){
    $scope.register = function(form){
        users.login(form)
    
        let conditions = {
          email: form.email
        }
        
        users.get(conditions)
        .then(function(existentUser){
          if(existentUser.length > 0){
            popups.alert("Usuario existente")
          }else if(form.password.length < 8){
            popups.alert("Contraseña demasiado corta")
          } else if ( file.files[0]) {
            saveImage(file).then((res) =>{
              return newUser = {name:form.name, email:form.email, description:form.description, password:form.password, img:res.path }
            }).then((res) =>{
              users.save(res)
              .then(popups.action("Usuario registrado con exito", function (){ (location.reload())}))
            }) 
          } else {
            newUser = form;
            users.save(newUser)
            .then(popups.action("Usuario registrado con exito", function (){ (location.reload())}))
          }
        }) 

       }; 
}]);

async function saveImage(file){
    return new Promise((resolve, reject) =>{
    // endpoint
    const url = process.env.SIDEKICK_API + 'imageupload';
    const formData = new FormData () ;
    formData.append("file", file.files[0]) ;
  
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