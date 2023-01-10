var arrOptions = [];

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
    for (var i=0, n = games.length; i < n; i++) { // looping over the options
      arrOptions.push("<img src='" + games[i].img + "' class=img-fluid alt='" + games[i].name + "'>");
      document.getElementById("games").innerHTML = arrOptions.join('');
  }
  arrOptions = [];
}

async function getOptions(any = false){

  var options = []
  var games = await this.getAllGames();

  if (any){
    options.push({value: "any", name: "Cualquier juego"});
  }
  
   for (var i=0, n = games.length; i < n; i++) { // looping over the options
      if (games[i]) {
        options.push({value: games[i].id_game, name: utils.capitalizeFirstLetter(games[i].name)});
      }
  } 

  return options;
}

getAllGames().then(
  function(response) {loadGames(response)}
)

module.exports = {
	getAllGames,
  getGame,
	loadGames,
  getOptions
};