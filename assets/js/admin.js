var txt = document.getElementsByTagName("textarea")[0];

document.getElementsByTagName("input")[0]
	.addEventListener('click', function(event) {
	var con = parent.connection;

	if (con.state === "authenticated") {
		con.query(txt.value, function(err, rows, fields) {
			if (err) {
				console.log("An error ocurred performing the query.");
				console.log(err);
			} else {
				console.log("Query succesfully executed.");
				console.log(rows);
				console.log(fields);
			}
		})
	}
});