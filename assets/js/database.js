const remote = require('electron').remote;
const mysql = remote.require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234', // or the original password : 'apaswword'
    database : 'introdbmp'
});

connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});

$query = 'SELECT * FROM account LIMIT 10';

connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }

    console.log("Query succesfully executed", rows);
});

connection.end(function(){
    // The connection has been closed
});