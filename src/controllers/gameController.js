async function getAllGames (){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'games';
    
    axios.get(url)
    .then((res) => {
      resolve(res.data)
    })
    .catch(function(error) {
      console.log(error);
    });
    })
  
}

async function getGame (condition){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'games/bo?';
    const params = new URLSearchParams(condition)

    axios.get(url + params)
    .then((res) => {
      resolve(res.data)
    })
    .catch(function(error) {
      console.log(error);
    });
    })
  
}

async function loadGames (games){
  var arrOptions = [];
    for (var i=0, n = games.length; i < n; i++) { // looping over the options
      arrOptions.push("<img src='" + games[i].img + "' class=img-fluid alt='" + games[i].name + "'>");
      document.getElementById("games").innerHTML = arrOptions.join('');
  }
  
}

getAllGames().then(
  function(response) {loadGames(response)}
)

module.exports = {
	getAllGames,
  getGame,
	loadGames
};