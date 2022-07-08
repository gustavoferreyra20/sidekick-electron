const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});


function getConnection() {
  return connection;
}

module.exports = { getConnection };