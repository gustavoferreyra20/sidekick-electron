const crypto = require('crypto');
var jwt = require('jsonwebtoken');
const axios = require('axios');

async function createToken(id){
    return new Promise((resolve, reject) =>{
    const session = crypto.randomBytes(20).toString('hex');
    const userToken = jwt.sign({id:id}, process.env.JWT_SECRET);
    const expire = new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000);
    const url = process.env.SIDEKICK_API + 'tokens';
   
    let token = {
      session: session,
      token: userToken,
      expire: expire.toISOString().slice(0, 10)
    }

    axios.post(url, token)
    .then(() => {
        resolve(token)
    })
    .catch(function(error) {
      console.log(error);
    });;
})

}

async function deleteToken(args){
    const url = process.env.SIDEKICK_API + 'tokens/bo?session='+ args.session + '&token='+ args.token;
    await axios.delete(url)
    .catch(function(error) {
      console.log(error);
    });; 

}

module.exports = {
    createToken,
    deleteToken
};