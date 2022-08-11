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
    for (var i=0, n = arrOptionsCollection.length; i < n; i++) { // looping over the options
        if (arrOptionsCollection[i]) {
            arrOptions.push("<option value='" + arrOptionsCollection[i].id_juego + "'>" + arrOptionsCollection[i].nombre + "</option>");
        }
    }

    document.getElementById("games").innerHTML = arrOptions.join(); 
  }

  getGames().then(
    function(response) {setOptions(response)}
  )




