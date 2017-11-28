const mysql = remote.require('mysql');

con = function() {
	global.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '1234', // or the original password : 'apaswword'
		database : 'introdbmp'
	});

	connection.connect((err) => {
		// in case of error
		if (err) {
			console.log(err.code);
			console.log(err.fatal);
			console.log("Retrying after 5 seconds...");
			setTimeout(con, 5000);
		} else {
			console.log("Connected to database.");
		}
	})
}

con();

/*
$query = 'SELECT * FROM account LIMIT 10';

connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
    } else {
		console.log("Query succesfully executed", rows);
	}
});

connection.end(function() {
    // The connection has been closed
});
*/