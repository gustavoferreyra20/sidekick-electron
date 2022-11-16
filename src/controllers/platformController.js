const axios = require("axios");

async function getPlatformsByGame(id_game){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'platforms/join?id_game=' + id_game;

    axios.get(url)
    .then((res) => {
      resolve(res.data)
    })
    .catch(function(error) {
      console.log(error);
    });
  })
}

    module.exports = {
      getPlatformsByGame
    }