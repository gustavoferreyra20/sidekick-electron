const crypto = require('crypto');
var jwt = require('jsonwebtoken');

async function createToken(args){
    return new Promise((resolve, reject) =>{
    const id = args[0].id_user
    const session = crypto.randomBytes(20).toString('hex');
    const userToken = jwt.sign({id:id}, process.env.JWT_SECRET);
    const expire = new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000);
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
    fetch(url, fetchData).then((response) => {
        return response.json();
      })
    .then(() => {
        resolve(token)
    }      
    )
    .catch(function(error) {
      console.log(error);
    });;
})

}

async function deleteToken(args){
    const url = process.env.SIDEKICK_API + 'tokens/bo?session='+ args.session + '&token='+ args.token;
  await fetch(url, { method: 'DELETE' }).catch(function(error) {
    console.log(error);
  });  

}

module.exports = {
    createToken,
    deleteToken
};