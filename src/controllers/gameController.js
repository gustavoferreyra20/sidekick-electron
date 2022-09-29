async function getAllGames (){
  return new Promise((resolve, reject) =>{
    const url = process.env.SIDEKICK_API + 'games';
    
    fetch(url, { method: 'GET' }).then((response) => {
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

async function loadGames (games){
  var arrOptions = [];
    for (var i=0, n = games.length; i < n; i++) { // looping over the options
      arrOptions.push("<img src='" + games[i].img + "' class=img-fluid alt='" + games[i].nombre + "'>");
      document.getElementById("games").innerHTML = arrOptions.join('');
  }
  
}

getAllGames().then(
  function(response) {loadGames(response)}
)

module.exports = {
	getAllGames,
	loadGames

};