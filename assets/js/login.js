var elm = document.getElementsByTagName("input");
var h3 = document.getElementsByTagName("h3");
var iframe = parent.document
	.getElementsByTagName("iframe")[1];

// login
elm[2].addEventListener('click', (event) => {
	var con = parent.connection;

	if (con) {
		con.query(
			"SELECT *\
			FROM\
				credential a,\
				account b\
			WHERE\
				a.account_id = b.id AND\
				b.email = \"" + elm[0].value + "\" AND\
				a.password = \"" + elm[1].value + "\"",
			(err, rows, fields) => {
				if (!err) {
					if (rows.length > 0) {
						// account found!
						parent.account_dat = rows[0];

						iframe.setAttribute(
							"src",
							"./assets/html/account.html"
						);
					} else {
						// no account found...
						h3[0].innerHTML =
							"Incorrect email or password!"
					}
				} else {
					// http 500!
					h3[0].innerHTML =
						"HTTP 500 internal server error!<br>Oh no!"
					console.log(err);
				}
			}
		)
	} else {
		// no connection...
		h3[0].innerHTML = "Whoops! You're not connected to the database!"
	}
});

// register
elm[6].addEventListener('click', (event) => {
	var con = parent.connection;

	if (con.state === "authenticated") {
		let pw = elm[4].value;

		if (pw === elm[5].value) {
			if (pw.length < 6) {
				h3[1].innerHTML =
"Your password needs to have 6 or more characters.";
				return;
			}

			con.query(
				"SELECT\
					account_id\
				FROM\
					book\
				WHERE\
					book.id = \"" + elm[3].value + "\"",
				(err, rows, fields) => {
					if (!err) {
						if (rows.length > 0) {
							// book found!
							let id = rows[0].account_id;

							con.query(
								"SELECT\
									b.id,\
									b.name_first,\
									b.name_midd,\
									b.name_last,\
									b.email,\
									a.password\
								FROM\
									credential a,\
									account b\
								WHERE\
									a.account_id = " + id + " AND\
									b.id = " + id,
								(err, rows, fields) => {
									if (!err) {
										if (rows.length === 0) {
											// unused number!
											con.query(
												"INSERT INTO credential(account_id, password)\
												VALUES (\"" + id + "\", \"" + pw + "\")",
												(err) => {
													if (!err) {
														parent.account_dat = rows[0];

														iframe.setAttribute(
															"src",
															"./assets/html/account.html"
														);
													}
												}
											);
										} else {
											// used number...
											h3[1].innerHTML = "That number is already used!";
										}
									} else {
										// http 500!
										h3[1].innerHTML = "HTTP 500 internal server error!<br>Oh no!";
										console.log(err);
									}
								}
							);
						} else {
							// no book found...
							h3[1].innerHTML = "We couldn't find that number here...";
						}
					} else {
						// http 500!
						h3[1].innerHTML = "HTTP 500 internal server error!<br>Oh no!";
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