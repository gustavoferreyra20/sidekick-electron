const { getConnection } = require("../database");

exports.getLatest = async function (table ,limit){
    const conn = await getConnection(); 
    const sql = "SELECT * FROM " + table + " ORDER BY id_" + table + " DESC LIMIT " + limit;
    return new Promise((resolve, reject) => {
        conn.query(sql, (error, results) => {
          if(error){ console.log(error);}
          resolve(results)
        });
      }) 
  }

  exports.loadGames = async function (games){
    var arrOptions = [];
    for (var i=0, n = games.length; i < n; i++) { // looping over the options
      arrOptions.push("<img src='" + games[i].img + "' class=img-fluid alt='" + games[i].nombre + "'>");
      document.getElementById("games").innerHTML = arrOptions.join('');
  }
  }

  exports.loadAds = async function (ads){
    var arrOptions = [];
    var html;
    var user;
    for (var i=0, n = ads.length; i < n; i++) { // looping over the options
     user = await userController.getUser(ads[i].id_usuarioPropietario)
     html = `
      <div class="container-fluid py-5 mx-auto p-3 post">
      <div class="row justify-content-start px-3">
        <div class="image-bg mr-3">
            <img class="user-img fit-image" src="https://i.imgur.com/RCwPA3O.jpg">
        </div>
        <div class="col text-left">
            <h2>` + ads[i].titulo +`</h2>
            <div class="mt-1 mb-1 spec-1">
              <span>` + user.nombre +`</span><br></span><span>Cazador de trofeos </span><span class="dot"></span><span>PS4<br></span>
            </div>
        </div>
        <div class="col-sm-12  col-lg-2 btn btn-post ml-auto">Unirse</div>
    </div>
    <div class="line"></div>
    <div class="row ml-auto">
        <img id="game" class="img-responsive rounded product-image" src="../img/games/MultiVersus.jpg">
        <p class="col">` + ads[i].descripcion +`</p>
    </div>
    </div>
      `;
      arrOptions.push(html);
      document.getElementById("ads").innerHTML = arrOptions.join('');
  }
  return new Promise((resolve, reject) => {
    resolve(arrOptions)
  }) 
  }

