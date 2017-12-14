var input = document.getElementsByTagName("input");
var label = document.getElementsByClassName("label");
var checkbox = document.getElementsByClassName("checkbox");
var def = ["localhost", "root", "1234", "introdbmp"];

// Setup globals.
parent.admin_config = [true,true,false,false];

for (i = 0; i < 4; i++) {
	let n = i;
	input[i].value = def[i];

	checkbox[i].addEventListener("click", (event) => {
		let v = event.target;

		parent.admin_config[n] =
			!parent.admin_config[n];

		if (v.hasAttribute("active")) {
			v.removeAttribute("active");
			v.innerHTML =
				v.innerHTML.substring(
					0,
					v.innerHTML.length - 2
				) + "OFF";
		} else {
			v.setAttribute("active", 1);
			v.innerHTML =
				v.innerHTML.substring(
					0,
					v.innerHTML.length - 3
				) + "ON";
		}
	})
}

// Connect to database.
const mysql = parent.remote.require('mysql');

con = function() {
	let connection = mysql.createConnection({
		host     : input[0].value,
		user     : input[1].value,
		password : input[2].value,
		database : input[3].value
	});

	connection.connect((err) => {
		if (err) {
			console.log(err.code);
			console.log(err.fatal);
			console.log("Retrying after 5 seconds...");
			setTimeout(con, 5000);
		} else {
			console.log("Connected to database.");

			parent.connection = connection;

			for (i = 0; i < 4; i++) {
				input[i].value = "";
				input[i].setAttribute("disabled", 1);
				input[i].removeAttribute("placeholder");
				label[i].innerHTML += ":connected"
			}
		}
	})
}

con();