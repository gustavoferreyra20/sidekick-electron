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
      arrOptions.push("<img src='" + games[i].img + "' class=img-fluid alt='" + games[i].nombre + "'></div>");
      document.getElementById("games").innerHTML = arrOptions.join('');
  }
  return new Promise((resolve, reject) => {
    resolve(arrOptions)
  }) 
  }

  exports.loadAnuncios = async function (games){
    var arrOptions = [];
    for (var i=0, n = games.length; i < n; i++) { // looping over the options
      arrOptions.push("<img src='" + games[i].img + "' class=img-fluid alt='" + games[i].nombre + "'></div>");
      document.getElementById("games").innerHTML = arrOptions.join('');
  }
  return new Promise((resolve, reject) => {
    resolve(arrOptions)
  }) 
  }