var { getConnection } = require("../database");
var arrOptions = [];

async function getGames(){
    conn = await getConnection();
    sql = "SELECT * FROM juego";
    return new Promise((resolve, reject) => {
      conn.query(sql, (error, results) => {
        if(error){ console.log(error);}
        resolve(results)
        
      });
    })
  }

  function setOptions(arrOptionsCollection){
    arrOptions.push("<option value='"+"' disabled selected>Selecciona un juego</option>");
    for (var i=0, n = arrOptionsCollection.length; i < n; i++) { // looping over the options
        if (arrOptionsCollection[i]) {
            arrOptions.push("<option value='" + arrOptionsCollection[i].id_juego + "'>" + arrOptionsCollection[i].nombre + "</option>");
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
    const user = await authController.geLoggedtUser()
    date = new Date(Date.now())
    sql = "INSERT INTO anuncio (id_usuarioPropietario, id_juego, plataforma, usuariosRequeridos, titulo, descripcion) values ('" + user.id_usuario + "', '" + + ad.games.value + "', '" +ad.platform.value + "', '"+ad.usersRequire.value + "', '" + ad.title.value + "', '" + ad.description.value + "' )";

    conn.query(sql, (error, results) => {

      if(error){ console.log(error);}
      popupController.action("Anuncio creado con exito", function (){ (location.reload())})

    }); 
  }

  getGames().then(
    function(response) {setOptions(response)}
  )





