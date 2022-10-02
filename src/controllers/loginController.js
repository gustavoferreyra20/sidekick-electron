const userController = require('../../controllers/userController');
const popupController = require('../../controllers/popupController');
const tokenController = require("../../controllers/tokenController");

let nombre;
let email; 
let password;
let loginForm; 
let registrationForm;
let btnToogle;

window.onload = function() { 
  loginForm = document.getElementById('loginForm');
  registrationForm = document.getElementById("registrationForm")
  btnToogle = document.getElementById("toggle")
  loginForm.addEventListener('submit', () => {
    event.preventDefault()
    email = document.getElementById("loginForm").elements["email"]
    password = document.getElementById("loginForm").elements["password"]
    const obj = {email:email.value, password:password.value }
    userController.login(obj)
  });

  registrationForm.addEventListener('submit', async () => {
    event.preventDefault()
    userName = document.getElementById("registrationForm").elements["userName"]
    email = document.getElementById("registrationForm").elements["email"]
    password = document.getElementById("registrationForm").elements["password"]
    const newUser = {name:userName.value, email:email.value, password:password.value }
    let conditions = {
      email: email.value
    }
    existentUser = await userController.getUser(conditions)
    if(existentUser.length > 0){
      popupController.alert("Usuario existente")
    }else if(newUser.password.length < 8){
      popupController.alert("Contraseña demasiado corta")
    } else {
      await userController.saveUser(newUser).then(popupController.action("Usuario registrado con exito", function (){ (location.reload())}))      
    }
  });

  btnToogle.onclick = function(e){
        e.preventDefault();
        var href = e.target.getAttribute("href");
        toggleDisplay('page', 'none');
        document.getElementById(href).style.display = 'block';    
   }
}
 
function toggleDisplay(className, displayState){
  var elements = document.getElementsByClassName(className)
  for (var i = 0; i < elements.length; i++){
      elements[i].style.display = displayState;
  }
}