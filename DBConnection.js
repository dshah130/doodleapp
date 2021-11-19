const mysql = require('mysql');

function newConnection()
{
    let conn = mysql.createConnection({
        host     : '34.68.217.182',
        user     : 'root',
        password : 'Basketball123!',
        database : 'lab3db'
    });
    return conn;
}
module.exports = newConnection;



