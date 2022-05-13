const { ipcRenderer }= require("electron");
const { getConnection } = require("../../database");
const bcrypt = require('bcrypt');

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
    validatelogin(obj)
  });

  registrationForm.addEventListener('submit', () => {
    event.preventDefault()
    nombre = document.getElementById("registrationForm").elements["nombre"]
    email = document.getElementById("registrationForm").elements["email"]
    password = document.getElementById("registrationForm").elements["password"]
    const obj = {nombre:nombre.value, email:email.value, password:password.value }
 
    registerUser(obj).then(validatelogin(obj))
  });

  btnToogle.onclick = function(e){
        e.preventDefault();
        var href = e.target.getAttribute("href");
        toggleDisplay('page', 'none');
        document.getElementById(href).style.display = 'block';    
   }
}

async function registerUser(obj){
    try {
        if(obj.password.length > 8){
          saveUser(obj)
        } else {
          console.log("Contraseña demasiado corta")
        }
    } catch (error) {
      console.log(error);
    }
};
 
function toggleDisplay(className, displayState){
  var elements = document.getElementsByClassName(className)
  for (var i = 0; i < elements.length; i++){
      elements[i].style.display = displayState;
  }
}

async function saveUser(obj){
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(obj.password, salt)
    const conn = await getConnection();
    const sql = "INSERT INTO usuarios (nombre, email, password) values ('" + obj.nombre + "', '" + obj.email + "', '" + password + "')";
    await conn.query(sql);
}

async function validatelogin(obj){
  try {
    const conn = await getConnection();
    const sql = "SELECT password FROM usuarios WHERE email=?"
    await conn.query(sql, [obj.email], (error, result) => {
      if(error){ console.log(error);}
  
      if(result.length > 0){
        if(bcrypt.compare(obj.password, result[0].password)){
          ipcRenderer.invoke("login", obj)
        }else{
          console.log("Datos incorrectos")
        }
         
       }else{
         console.log("Datos incorrectos")
       }
      
    });
  } catch (error) {
    console.log(error);
  }
};