const authController = require('../../controllers/authController');
var popup = require('popups');

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
    authController.login(obj)
  });

  registrationForm.addEventListener('submit', async () => {
    event.preventDefault()
    nombre = document.getElementById("registrationForm").elements["nombre"]
    email = document.getElementById("registrationForm").elements["email"]
    password = document.getElementById("registrationForm").elements["password"]
    const obj = {nombre:nombre.value, email:email.value, password:password.value }
    if(await authController.checkEmail(obj.email) > 0){
      alertPopup("Usuario existente")
    }else if(obj.password.length < 8){
      alertPopup("Contraseña demasiado corta")
    } else {
      await authController.saveUser(obj).then(saveUserPopup("Usuario registrado con exito", function (){ (location.reload())}))      
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

function alertPopup(msg){
  popup.window({
    mode: "alert",
    additionalButtonHolderClass: 'form-group',
    additionalButtonOkClass: "btn btn-block btn-primary",
    content: "<div class= form-group>" + msg + "</div>"
});
}

function saveUserPopup(msg, action){
  popup.window({
    mode: "alert",
    additionalButtonHolderClass: 'form-group',
    additionalButtonOkClass: "btn btn-block btn-primary",
    content: "<div class= form-group>" + msg + "</div>",
    onSubmit: function(){
      action() 
    },
    onClose: function(){
      action() 
    }
});
}