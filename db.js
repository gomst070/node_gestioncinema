//Database connection, correction bug connexion avec port : 8889 => phpmyadmin
var mysql = require("mysql");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodedb',
    port     :  8889 
    });

connection.connect(function(error) {
    if (error) throw error;
});
module.exports = connection;