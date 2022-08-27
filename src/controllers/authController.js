const { ipcRenderer }= require("electron");
const { getConnection } = require("../database");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util')
const crypto = require('crypto');
const { resolve } = require("path");

exports.login = async function (obj){
    try {
        const conn = await getConnection();
        const sql = "SELECT * FROM usuarios WHERE email=?"
        
        conn.query(sql, [obj.email], (error, results) => {
         
          if(error){ console.log(error);}
      
          if( results.length == 0 || ! (bcryptjs.compareSync(obj.password, results[0].password) )){
            alertPopup("Usuario y/o contraseña incorrectas")
          }else{
            const id = results[0].id_usuario
            const session = crypto.randomBytes(20).toString('hex');
            const userToken = jwt.sign({id:id}, process.env.JWT_SECRET)
            const userHash = crypto.randomBytes(20).toString('hex');
            const value = session + "|" + userToken+ "|" + userHash
            const expire = new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000)

            const sql = "INSERT INTO tokens (session, token, user, expire) values ('" + session + "', '" +userToken + "', '" + userHash + "', '" +expire.toISOString().slice(0, 10) + "')";
            conn.query(sql, [obj.email], (error, results) => {
              if(error){ console.log(error);}
            });

            ipcRenderer.invoke("login", value)
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

exports.isAuthenticated = async function (cookie){
  const conn = await getConnection(); 
  const myArray = cookie[0].value.split("|");
  const session = myArray[0];
  const token = myArray[1];
  const sql = "SELECT user FROM tokens WHERE session = '" + session + "' AND token = '" + token + "'";
  return new Promise((resolve, reject) => {
    if (cookie){
      conn.query(sql, (error, results)=>{
      ipcRenderer.invoke("authUser", cookie[0].value)
      if(error){ console.log(error);}
      resolve(results)
      })

    }
  });
};

exports.checkEmail = async function (email){
  const conn = await getConnection();
  const sql = "SELECT * FROM usuarios where email=?";
  return new Promise((resolve, reject) => {
    conn.query(sql, [email], (error, results) => {
      if(error){ console.log(error);}
      resolve(results.length)
      
    });
  })
}

exports.logout = async function (){
  const conn = await getConnection(); 
  const myArray = process.env.JWT_COOKIE.split("|");
  const session = myArray[0];
  const token = myArray[1];
  const sql = "DELETE FROM tokens WHERE session = '" + session + "' AND token = '" + token + "'";
  conn.query(sql, (error, results)=>{
    if(error){ console.log(error);}
    })
}

exports.geLoggedtUser = async function (){
  const conn = await getConnection(); 
  const myArray = process.env.JWT_COOKIE.split("|");
  const decodificada = await promisify(jwt.verify)(myArray[1], process.env.JWT_SECRET)
  return new Promise((resolve, reject) => {   
    conn.query('SELECT id_usuario, nombre, email, descripcion, img FROM usuarios WHERE id_usuario = ?', [decodificada.id], (error, results)=>{
      if(error){ console.log(error);}
      user = {id_usuario:results[0].id_usuario, nombre:results[0].nombre, email:results[0].email, descripcion:results[0].descripcion, img:results[0].img }
      resolve(user) 
    })
  });
}

