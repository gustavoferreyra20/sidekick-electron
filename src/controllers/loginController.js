const { ipcRenderer }= require("electron");
const { getConnection } = require("../../database");

let btnlogin;
let email; 
let password;

window.onload = function() { 
  email = document.getElementById("email")
  password = document.getElementById("password")
  btnlogin = document.getElementById("login")

  btnlogin.onclick = function(){
    
   const obj = {email:email.value, password:password.value }

   validatelogin(obj)
  }
}

const validatelogin = async (obj) => {
  try {
    const conn = await getConnection();
    const { email, password } = obj 
    const sql = "SELECT * FROM usuario WHERE email=? AND password=?"
    await conn.query(sql, [email, password], (error, results, fields) => {
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
 
function toggleDisplay(className, displayState){
  var elements = document.getElementsByClassName(className)
  for (var i = 0; i < elements.length; i++){
      elements[i].style.display = displayState;
  }
}
function toggle(){
  document.onclick = function(e) {
    if (e.target.tagName == 'BUTTON') {
      var href = e.target.getAttribute("href");
      toggleDisplay('page', 'none');
      document.getElementById(href).style.display = 'block';
      return false;
    }
  }
}