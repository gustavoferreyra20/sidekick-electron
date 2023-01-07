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

  var games = await this.getAllGames();

  if (any){
    arrOptions.push("<option value='any'>Cualquier juego</option>");
  }
  
   for (var i=0, n = games.length; i < n; i++) { // looping over the options
      if (games[i]) {
          arrOptions.push("<option value='" + games[i].id_game + "'>" + utils.capitalizeFirstLetter(games[i].name) + "</option>");
      }
  } 

  document.getElementById("game").innerHTML = arrOptions.join('');
  arrOptions = []; 
    
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