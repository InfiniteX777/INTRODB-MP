// I destroy all those who have been forgotten!

let con, loop_for, devour;

// Eat those tasty accounts!
devour = () => {
	if (parent.admin_config && parent.admin_config[1]) {
		con.query(
			"DELETE FROM account\
			WHERE\
				id NOT IN (\
					SELECT account_id\
					FROM credential\
				) AND\
				id NOT IN (\
					SELECT account_id FROM book a, flight b\
					WHERE\
						a.flight_id = b.id AND\
						b.depart > NOW()\
				)",
			(err, rows) => {
				if (err) {
					// Indigestion.
					console.log(err);
				} else {
					if (rows.affectedRows > 0) {
						console.log(
							"OVERLORD: I HAVE " +
							"DEVOURED " +
							rows.affectedRows +
							" MORTAL(S)!"
						);
					}
				}
			}
		)
	}

	// NO REST FOR THE WICKED!
	setTimeout(devour, 5000);
}

loop_for = () => {
	if (parent.connection) {
		con = parent.connection;

		// eat them.
		devour();
	} else {
		setTimeout(loop_for, 5000);
	}
}

loop_for();