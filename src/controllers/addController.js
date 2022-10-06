var arrOptions = [];

  function setOptions(games){
    arrOptions.push("<option value='"+"' disabled selected>Selecciona un juego</option>");
    for (var i=0, n = games.length; i < n; i++) { // looping over the options
        if (games[i]) {
            arrOptions.push("<option value='" + games[i].id_game + "'>" + games[i].name + "</option>");
        }
    }

    document.getElementById("games").innerHTML = arrOptions.join();
    arrOptions = []; 
  }

  async function setPlatforms(game){
    var platforms = await platformController.getPlatformsByGame(game.value)     
     for (var i=0, n = platforms.length; i < n; i++) { // looping over the options
        if (platforms[i]) {
            arrOptions.push("<option value='" + platforms[i].id_platform + "'>" + platforms[i].name + "</option>");
        }
    } 

    document.getElementById("platform").innerHTML = arrOptions.join('');
    arrOptions = []; 
      
  }

  async function saveAd(ad){
      const url = process.env.SIDEKICK_API + 'posts';
      let data = {
        id_user: userSession.id_user,
        id_game: ad.games.value,
        id_platform:  ad.platform.value,
        requiredUsers: ad.usersRequire.value,
        actualUsers: 1,
        title:  ad.title.value,
        description: ad.description.value
      }
  
      let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8'
        })
      }
  
      fetch(url, fetchData)
      .then(() => {
        // create the cookie
        popupController.action("Anuncio creado con exito", function (){ (location.reload())})
    })
      .catch(function(error) {
        console.log(error);
      }); 
  }

  gameController.getAllGames().then(
    function(response) {setOptions(response)}
  )




