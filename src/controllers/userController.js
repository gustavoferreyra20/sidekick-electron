const { ipcRenderer }= require("electron");
const crypto = require('crypto');
var jwt = require('jsonwebtoken');

async function login(obj){
        const url = process.env.SIDEKICK_API + 'users/bo?email='+ obj.email + '&password='+ obj.password
        fetch(url, { method: 'GET' }).then((response) => {
          return response.json();
        })
        .then((data) => {
            // create the cookie
            const id = data[0].id_user
            const session = crypto.randomBytes(20).toString('hex');
            const userToken = jwt.sign({id:id}, process.env.JWT_SECRET);
            const expire = new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000);
            const localToken = session + "|" + userToken + "|" + expire
            const url = process.env.SIDEKICK_API + 'tokens';
           
            let token = {
              session: session,
              token: userToken,
              expire: expire.toISOString().slice(0, 10)
            }
        
            let fetchData = {
              method: 'POST',
              body: JSON.stringify(token),
              headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
              })
            }
            fetch(url, fetchData);

            ipcRenderer.invoke("login", JSON.stringify(token))
        })
        .catch(function(error) {
          console.log(error);
          popupController.alert("Usuario y/o contraseña incorrectas")
        }); 
        
}

async function saveUser(obj){
    const url = process.env.SIDEKICK_API + 'users';

    let data = {
      name: obj.name,
      email: obj.email,
      password:  obj.password
    }

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }

    fetch(url, fetchData)
    .catch(function(error) {
      console.log(error);
    }); 
}

// check if the cookie match with an user in db
async function isAuthenticated(cookie){
  const jsCookie = JSON.parse(cookie[0].value)
  const url = process.env.SIDEKICK_API + 'tokens?session='+ jsCookie.session + '&token='+ jsCookie.token
  fetch(url, { method: 'GET' }).then((response) => {
    return response.json();
  })
  .then((data) => {
    if(data.length > 0){
      ipcRenderer.invoke("authUser", cookie[0].value)
    }else{
      //Cookie expired in database
      ipcRenderer.invoke("noCookie")
    }
  })
  .catch(function(error) {
    console.log(error);
  }); 
};

async function logout(jwt){
  const url = process.env.SIDEKICK_API + 'tokens/bo?session='+ jwt.session + '&token='+ jwt.token;
  await fetch(url, { method: 'DELETE' }).catch(function(error) {
    console.log(error);
  });  

}

async function getUser(condition){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'users/bo?';
    const params = new URLSearchParams(condition)
    
    fetch(url + params, { method: 'GET' }).then((response) => {
      return response.json();
    })
  .then((data) => {
    resolve(data)
  })
  .catch(function(error) {
    console.log(error);
  });
  })
  
}

module.exports = {
	login,
	saveUser,
  isAuthenticated,
  logout,
  getUser
};