var len = [6, 12]; // x, y
var search_dat = parent.search_dat;
var selected_fare = parent.selected_fare;
var iframe = parent.document
	.getElementsByTagName("iframe")[0];
var tbody = document.getElementsByTagName("tbody");
var elm_a = document.getElementsByTagName("a")[0];
var elm_b = document.getElementsByTagName("b");
var elm_c = document.getElementsByTagName("c");
var input = document.getElementsByTagName("input");
var selected_seat = [{length: 0},{length: 0}];
var max_seat =
	Number(search_dat[7]) +
	Number(search_dat[8]) +
	Number(search_dat[9]);

function setup(i, from, to, depart) {
	elm_b[i].innerHTML = from + " to " + to;
	elm_c[i].innerHTML = depart;

	for (y = 0; y <= len[1]; y++) {
		var tr = document.createElement("tr");
		tbody[i].appendChild(tr);

		for (x = 0; x <= len[0]; x++) {
			if (y === 0) {
				var th = document.createElement("th");
				tr.appendChild(th);

				if (x === 0) {
				} else {
					th.innerHTML = x;
				}
			} else {
				if (x === 0) {
					var th = document
						.createElement("th");
					tr.appendChild(th);

					th.innerHTML = String
						.fromCharCode(64+y);
				} else {
					let td = document
						.createElement("td");
					let seat =
						String.fromCharCode(64+y) + x;
					tr.appendChild(td);

					td.innerHTML = seat;

					var con = parent.connection;

					if (con) {
						con.query("\
	SELECT id\
	FROM book\
	WHERE book.flight_id = " + Number(selected_fare[i].id) + "\
	AND book.seat = \"" + seat + "\"",
							(err, rows) => {
								if (!err &&
									rows.length > 0) {
									td.setAttribute(
										"disabled",1
									);
								}
						})
					}

					if (!td.hasAttribute("disabled")) {
						td.addEventListener("click",
							(event) => {
							if (td
								.hasAttribute("disabled")
							   ) {
								console.log("NOPE");
								return;
							}

							var btn = event.target;
							var v = btn.innerHTML;

							if (selected_seat[i][v]) {
								selected_seat[i].length--;
								delete
									selected_seat[i][v];
								btn.removeAttribute(
									"selected"
								);
							} else if (selected_seat[i]
									   .length < max_seat) {
								btn.setAttribute(
									"selected", 1
								);

								selected_seat[i][v] = 1;
								selected_seat[i].length++;
							}
						})
					}
				}
			}
		}
	}
}

setup(0, search_dat[1], search_dat[2], search_dat[5]);

if (search_dat[0] > 0) {
	setup(1,
		  search_dat[3],
		  search_dat[4],
		  search_dat[6]);
}

input[0].addEventListener("click", (event) => {
	// Back
	iframe.setAttribute(
		"src",
		"./assets/html/flight.html"
	);
})

input[1].addEventListener("click", (event) => {
	// Next
	if (selected_seat[0].length === max_seat &&
		(search_dat[0] === "0" ||
		 selected_seat[1].length === max_seat)) {
		parent.selected_seat = selected_seat;

		iframe.setAttribute(
			"src",
			"./assets/html/book.html"
		);
	} else {
		elm_a.innerHTML =
			"You haven't selected enough seats!";
	}
})