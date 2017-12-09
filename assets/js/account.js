var account_dat = parent.account_dat;
var input = document.getElementsByTagName("input");
var elm_h2 = document.getElementsByTagName("h2")[0];
var elm_h3 = document.getElementsByTagName("h3")[0];
var elm_h4 = document.getElementsByTagName("h4")[0];
var iframe = parent.document
	.getElementsByTagName("iframe")[1];
var welcome_index = [
	"Hey there, <name>!",
	"What's up, <name>?",
	"How's it going, <name>?",
	"Anything today, <name>?",
	"What can I do for you, <name>?",
	"Looking good, <name>!",
	"Good day, <name>!",
	"Welcome, <name>.",
	"Nice seeing you, <name>!",
	"Another beautiful day, <name>!",
	"Good to see you, <name>."
];
var dat_index = [
	"name_first",
	"name_midd",
	"name_last",
	"email"
];

console.log(account_dat.last_log);

// Setup account log (this applies to booking as well).
elm_h3.innerHTML =
	"Last logged: " +
	account_dat.last_log.toLocaleString();

// Update the log date.
var con = parent.connection;
var t = new Date();

if (con) {
	con.query(
		"UPDATE credential\
			SET\
				last_log = \"" +
					t.getFullYear() + "-" +
					(t.getMonth()+1) + "-" +
					t.getDate() + " " +
					t.getHours() + ":" +
					t.getMinutes() + ":" +
					t.getSeconds() +
				"\"\
			WHERE\
				account_id = " + account_dat.id,
		(err) => {
			if (err) {
				console.log(err);
			}
		}
	)
}

// Politeness.
function greet() {
	elm_h2.innerHTML =
		welcome_index[
			Math.floor(Math.random()*welcome_index.length)
		].replace("<name>", account_dat.name_first);
}

greet();

// Setup the user details.
function set_input() {
	for (i = 0; i < 4; i++) {
		input[i].value = account_dat[dat_index[i]];
	}
}

// Reset
input[6].addEventListener("click", set_input);

// Update
input[7].addEventListener("click", (event) => {
	var con = parent.connection;

	if (con) {
		elm_h4.innerHTML = "";

		con.query(
			"UPDATE account a\
				SET\
					name_first = \"" +
						input[0].value + "\",\
					name_midd = \"" +
						input[1].value + "\",\
					name_last = \"" +
						input[2].value + "\",\
					email = \"" +
						input[3].value + "\"\
				WHERE\
					a.id = " + account_dat.id,
			(err) => {
				if (!err) {
					for (i = 0; i < 4; i++) {
						account_dat[dat_index[i]] =
							input[i].value;
					}

					greet();

					elm_h4.innerHTML += " Account \
						details updated successfully!";
				} else {
					elm_h4.innerHTML += " Something went \
						wrong with your account \
						details update...";
					console.log(err);
				}
			}
		);

		// Password!
		if (input[4].value.length >= 6) {
			if (input[5].value === account_dat.password) {
				con.query(
					"UPDATE credential a\
						SET\
							password = \"" +
								input[4].value + "\"\
						WHERE\
							a.account_id = " +
								account_dat.id,
					(err) => {
						if (!err) {
							account_dat.password =
								input[4].value;
							elm_h4.innerHTML +=
								" Password successfully \
								updated!";
						} else {
							elm_h4.innerHTML +=
								" Something went wrong \
								with your password \
								update...";
							console.log(err);
						}
					}
				)
			} else {
				elm_h4.innerHTML += " Incorrect password!";
			}
		}
	} else {
		elm_h4.innerHTML = "No connection...";
	}
})

// Logout
input[8].addEventListener("click", (event) => {
	delete parent.account_dat;

	iframe.setAttribute(
		"src",
		"./assets/html/login.html"
	);
})

// Flight History
input[9].addEventListener("click", (event) => {
	iframe.setAttribute(
		"src",
		"./assets/html/history.html"
	);
})

set_input();