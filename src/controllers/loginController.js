const { ipcRenderer }= require("electron");
const { getConnection } = require("../../database");

let nombre;
let email; 
let password;
let passwordRepeat;
let loginForm; 
let registrationForm;
let btnToogle;

window.onload = function() { 
  loginForm = document.getElementById('loginForm');
  registrationForm = document.getElementById("registrationForm")
  btnToogle = document.getElementById("toggle")

  loginForm.addEventListener('submit', () => {
    email = document.getElementById("loginForm").elements["email"]
    password = document.getElementById("loginForm").elements["password"]
    const obj = {email:email.value, password:password.value }
    validatelogin(obj)
  });

  registrationForm.addEventListener('submit', () => {
    nombre = document.getElementById("registrationForm").elements["nombre"]
    email = document.getElementById("registrationForm").elements["email"]
    password = document.getElementById("registrationForm").elements["password"]
    passwordRepeat = document.getElementById("registrationForm").elements["passwordRepeat"]
    const obj = {nombre:nombre.value, email:email.value, password:password.value }
 
    registerUser(obj)
  });

  btnToogle.onclick = function(e){
        e.preventDefault();
        var href = e.target.getAttribute("href");
        toggleDisplay('page', 'none');
        document.getElementById(href).style.display = 'block';    
   }
}

const registerUser = async (obj) => {
  try {
    const conn = await getConnection();
    const sql = "INSERT INTO usuarios (nombre, email, password) values ('" + obj.nombre + "', '" + obj.email + "', '" + obj.password + "')";
    await conn.query(sql);
    validatelogin(obj)
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

const validatelogin = async (obj) => {
  try {
    const conn = await getConnection();
    const sql = "SELECT * FROM usuarios WHERE email=? AND password=?"
    await conn.query(sql, [obj.email, obj.password], (error, results, fields) => {
      if(error){ console.log(error);}
  
      if(results.length > 0){
        ipcRenderer.invoke("login", obj)
         
       }else{
         console.log("Datos incorrectos")
       }
      
    });
  } catch (error) {
    console.log(error);
  }
};