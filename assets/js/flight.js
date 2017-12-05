let selected_fare = [];
var elm = parent.search_dat;
	// The stuffs that you put in the search section.
var tbody = document.getElementsByTagName("tbody");
	// The tables.
var labelb = document.getElementsByTagName("b");
	// The destinations' label.
var labelc = document.getElementsByTagName("c");
	/* The destinations' subtitle.
	   Either the date or a warning.
	*/
var index = ["fare_seat", "fare_baggage", "fare_meal"];

// Submit buttons (Back/Next button)
var submit = document.getElementsByName("submit");
var iframe = parent.document
	.getElementsByTagName("iframe")[0];

submit[0].addEventListener("click", (event) => {
	// Back
	iframe.setAttribute(
		"src",
		"./assets/html/search.html"
	);
})

var warn = document.getElementsByTagName("a")[0];
	// Warning for those who violate the rules!
submit[1].addEventListener("click", (event) => {
	// Next
	if (selected_fare[0] &&
		(elm[0] === "0" || selected_fare[1])) {
		// Make sure the guy selected one of the fares.
		iframe.setAttribute(
			"src",
			"./assets/html/book.html"
		);
	} else {
		// Show him some manners.
		warn.innerHTML = "Please select a fare!";
	}
})

function createTD(inner, parent) {
	var v = document.createElement("td");
	v.innerHTML = inner;

	parent.appendChild(v);

	return v;
}

function getFlightList(tindex, list) {
	var body = tbody[tindex];

	body.innerHTML = "<tr>\
		<th>ID</th>\
		<th>Departure</th>\
		<th>Fly</th>\
		<th>Fly+<br>Baggage</th>\
		<th>Fly+<br>Baggage+<br>Meals</th>\
	</tr>\n"; // clear everything.

	for (i = 0; i < list.length; i++) {
		var tag = list[i];
		var a = document.createElement("tr");
		body.appendChild(a);

		createTD(
			tag.id.substring(0,5) + "<br>" +
			tag.id.substring(5),
			a
		);
		console.log(tag.depart.toTimeString());
		createTD(
			tag.depart.toTimeString().substring(0,8),
			a
		);

		for (n = 0; n < 3; n++) {
			if (tag[index[n]]) {
				b = document.createElement("td");
				a.appendChild(b);

				var c = document.createElement('input');
				c.name = "flight-choice" + tindex;
				c.type = "radio";

				b.appendChild(c);
				b.innerHTML += "P " + tag[index[n]];

				b.getElementsByTagName("input")[0]
					.addEventListener("click",
									  (event) => {
					selected_fare[tindex] = tag;
					/*iframe.setAttribute(
						"src",
						"./assets/html/search.html"
					);*/
				});
			}
		}
	}
}

var con = parent.connection;
var list;

function setup(labelIndex, from, to, depart) {
	labelb[labelIndex].innerHTML = from + " to " + to;

	con.query(
		"SELECT\
			id,\
			depart,\
			fare_seat,\
			fare_baggage,\
			fare_meal\
		FROM\
			flight\
		WHERE\
			flight.from = \"" + from + "\" AND\
			flight.to = \"" + to + "\" AND\
			DATE(flight.depart) = \"" + depart + '"',
		(err, rows, fields) => {
			if (!err) {
				if (rows.length > 0) {
					// account found!
					labelc[labelIndex].innerHTML = 
						depart;
					getFlightList(labelIndex, rows);
				} else {
					// no account found...
					labelc[labelIndex].innerHTML =
						"<br>There doesn't seem to " +
						"be any available flights " +
						"for that..."
				}
			} else {
				// http 500!
				labelc[labelIndex].innerHTML =
					"<br>Whoops! It seems that we've " +
					"ran into an HTTP 500 error! " +
					"Please try again later."
				console.log(err);
			}
		}
	)
}

setup(0, elm[1], elm[2], elm[5]);

if (elm[0] > 0) {
	// multiple destinations.
	if (elm[0] === "1") {
		//Setup round-trip (reverse the path).
		elm[3] = elm[2];
		elm[4] = elm[1];
		elm[6] = elm[5];
	}

	setup(1, elm[3], elm[4], elm[6]);
}