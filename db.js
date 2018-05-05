var mysql = require('mysql')
var config = require('config')

dbConfig = config.get('db');

var connection = mysql.createConnection({
  host     : dbConfig.host,
  user     : dbConfig.user,
  password : dbConfig.pass,
  database : dbConfig.database
});

connection.connect()

module.exports = connection;