async function getPlatformsByGame(id_game){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'platforms/join?id_game=';

    fetch(url + id_game, { method: 'GET' }).
    then((response) => {
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
      getPlatformsByGame
    }