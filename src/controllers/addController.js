var { getConnection } = require("../database");
var jwt = require('jsonwebtoken');
var {promisify} = require('util');
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
    conn = await getConnection();
    sql = "SELECT P.* FROM plataforma P INNER JOIN plataforma_juego PJ ON P.id_plataforma=PJ.id_plataforma WHERE PJ.id_juego=" + game.value;
    conn.query(sql, (error, results) => {

      if(error){ console.log(error);}
      
      for (var i=0, n = results.length; i < n; i++) { // looping over the options
        if (results[i]) {
            arrOptions.push("<option value='" + results[i].id_plataforma + "'>" + results[i].nombre + "</option>");
        }
    }

    document.getElementById("platform").innerHTML = arrOptions.join('');
    arrOptions = []; 
      
    });
  }

  async function saveAd(ad){
    conn = await getConnection();
    const myArray = process.env.JWT_COOKIE.split("|");
    const decodificada = await promisify(jwt.verify)(myArray[1], process.env.JWT_SECRET)
    const user = await userController.getUser(decodificada.id)
    date = new Date(Date.now())
    sql = "INSERT INTO anuncio (id_usuarioPropietario, id_juego, plataforma, usuariosRequeridos, titulo, descripcion) values ('" + user.id_usuario + "', '" + + ad.games.value + "', '" +ad.platform.value + "', '"+ad.usersRequire.value + "', '" + ad.title.value + "', '" + ad.description.value + "' )";
    conn.query(sql, (error, results) => {

      if(error){ console.log(error);}
      popupController.action("Anuncio creado con exito", function (){ (location.reload())})

    });  

  }

  gameController.getAllGames().then(
    function(response) {setOptions(response)}
  )




