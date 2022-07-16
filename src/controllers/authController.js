const { ipcRenderer }= require("electron");
const { getConnection } = require("../database");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util')

exports.login = async function (obj){
    try {
        const conn = await getConnection();
        const sql = "SELECT * FROM usuarios WHERE email=?"
        
        conn.query(sql, [obj.email], (error, results) => {
         
          if(error){ console.log(error);}
      
          if( results.length == 0 || ! (bcryptjs.compareSync(obj.password, results[0].password) )){
            alertPopup("Usuario y/o contraseña incorrectas")
          }else{
            const id = results[0].id
            const token = jwt.sign({id:id}, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_TIME_EXPIRES
            })
            
            ipcRenderer.invoke("login", token)
          }
          
        });
      } catch (error) {
        console.log(error);
      }
}

exports.saveUser = async function (obj){
  const salt = await bcryptjs.genSalt();
    password = await bcryptjs.hash(obj.password, salt)
    const conn = await getConnection();
    const sql = "INSERT INTO usuarios (nombre, email, password) values ('" + obj.nombre + "', '" + obj.email + "', '" + password + "')";
    await conn.query(sql);
}

exports.isAuthenticated = async function isAuthenticated(){
  let cookie = session.defaultSession.cookies.get({name:  'jwt'})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

  if (cookie){
    try {
      const decodicada = await promisify(jwt.verify)(cookie, process.JWT_SECRET)
      const conn = await getConnection();
      const sql = "SELECT * FROM usuarios WHERE id = ?"
      conn.query(sql, [decodificada.id], (error, results)=>{
        console.log(results)
        })
    } catch (error) {
        console.log(error)
    }
  }
}

exports.checkEmail = async function (email){
  const conn = await getConnection();
  const sql = "SELECT * FROM usuarios where email = '" + email +"' ";
  return new Promise((resolve, reject) => {
    conn.query(sql, [email], (error, results) => {
      if(error){ console.log(error);}
      resolve(results.length)
      
    });
  })
}
