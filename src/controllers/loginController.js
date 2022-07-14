const { ipcRenderer }= require("electron");
const { getConnection } = require("../../database");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    validatelogin(obj)
  });

  registrationForm.addEventListener('submit', async () => {
    event.preventDefault()
    nombre = document.getElementById("registrationForm").elements["nombre"]
    email = document.getElementById("registrationForm").elements["email"]
    password = document.getElementById("registrationForm").elements["password"]
    const obj = {nombre:nombre.value, email:email.value, password:password.value }
    if(await checkEmail(obj.email) > 0){
      alertPopup("Usuario existente")
    }else if(obj.password.length < 8){
      alertPopup("Contraseña demasiado corta")
    } else {
      await saveUser(obj)
      location.reload()
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

async function saveUser(obj){
    const salt = await bcryptjs.genSalt();
    password = await bcryptjs.hash(obj.password, salt)
    const conn = await getConnection();
    const sql = "INSERT INTO usuarios (nombre, email, password) values ('" + obj.nombre + "', '" + obj.email + "', '" + password + "')";
    await conn.query(sql);
}

async function validatelogin(obj){
  try {
    const conn = await getConnection();
    const sql = "SELECT * FROM usuarios WHERE email=?"
    
    conn.query(sql, [obj.email], (error, results) => {
     
      if(error){ console.log(error);}
  
      if( results[0].password.length == 0 || ! (bcryptjs.compareSync(obj.password, results[0].password) )){
        alertPopup("Usuario y/o contraseña incorrectas")
      }else{
        const id = results[0].id
        const token = jwt.sign({id:id}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_TIME_EXPIRES
        })

        const cookiesoptions = {
        expires: new Date (Date.now () +process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httponly: true
        }
        
        ipcRenderer.invoke("login", token)
      }
      
    });
  } catch (error) {
    console.log(error);
  }
};

async function checkEmail(email){
  const conn = await getConnection();
  const sql = "SELECT * FROM usuarios where email = '" + email +"' ";
  return new Promise((resolve, reject) => {
    conn.query(sql, [email], (error, results) => {
      if(error){ console.log(error);}
      resolve(results.length)
      
    });
  })
}

function alertPopup(msg){
  popup.window({
    mode: "alert",
    additionalButtonHolderClass: 'form-group',
    additionalButtonOkClass: "btn btn-block btn-primary",
    content: "<div class= form-group>" + msg + "</div>"
});
}