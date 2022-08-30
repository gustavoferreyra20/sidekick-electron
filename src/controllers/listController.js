const { getConnection } = require("../database");

exports.getLatest = async function (table ,limit){
    const conn = await getConnection(); 
    const sql = "SELECT * FROM " + table + " ORDER BY id_juego DESC LIMIT " + limit;
    return new Promise((resolve, reject) => {
        conn.query(sql, (error, results) => {
          if(error){ console.log(error);}
          resolve(results)
        });
      }) 
  }