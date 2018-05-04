var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password0!',
  database : 'redash_map'
});

connection.connect()

module.exports = connection;