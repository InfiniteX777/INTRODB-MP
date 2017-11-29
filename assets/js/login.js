var elm = document.getElementsByTagName("input");
var h3 = document.getElementsByTagName("h3");
var iframe = window.parent.document.getElementsByName("login-view")[0];

// login
elm[2].addEventListener('click', (event) => {
	var con = parent.connection;

	if (con.state === "authenticated") {
		con.query(
			"SELECT\
				email\
			FROM\
				account\
			WHERE\
				email = " + elm[0].getAttribute("value"),
			(err, rows, fields) => {
				if (!err) {
					if (rows.length > 0) {
						// account found!
						iframe.setAttribute("src", "./assets/html/account.html");
					} else {
						// no account found...
						h3[0].innerHTML = "We couldn't find any account with the same email..."
					}
				} else {
					// http 500!
					h3[0].innerHTML = "HTTP 500 internal server error!<br>Oh no!"
					console.log(err);
				}
			}
		)
	} else {
		// no connection...
		h3.innerHTML = "Whoops! You're not connected to the database!"
	}
});

// register
elm[6].addEventListener('click', (event) => {
	var con = parent.connection;

	if (con.state === "authenticated") {
		var pw = elm[4].getAttribute("value");

		if (pw === elm[5].getAttribute("value")) {
			var v = elm[3].getAttribute("value");

			con.query(
				"SELECT\
					account_id\
				FROM\
					book\
				WHERE\
					book.id = \"" + v + "\"",
				(err, rows, fields) => {
					if (!err) {
						if (rows.length > 0) {
							v = rows[0].account_id;
							// book found!
							con.query(
								"SELECT\
									id\
								FROM\
									credential a\
								WHERE\
									a.account_id = \"" + v + "\"",
								(err, rows, fields) => {
									if (!err) {
										if (rows.length === 0) {
											// unused number!
										} else {
											// used number...
											h3[1].innerHTML = "That number is already used!"
										}
									} else {
										// http 500!
										h3[1].innerHTML = "HTTP 500 internal server error!<br>Oh no!"
										console.log(err);
									}
								}
							)
						} else {
							// no book found...
							h3[1].innerHTML = "We couldn't find that number here..."
						}
					} else {
						// http 500!
						h3[1].innerHTML = "HTTP 500 internal server error!<br>Oh no!"
						console.log(err);
					}
				}
			)
		} else {
			h3[1].innerHTML = "Your password doesn't match!"
		}
	} else {
		// no connection...
		h3[1].innerHTML = "Whoops! You're not connected to the database!"
	}
})