var account_dat = parent.account_dat;
var con = parent.connection;
var back = document.getElementsByTagName("input")[0];
var okay = document.getElementsByTagName("input")[1];
var table = document.getElementsByTagName("table");
var div = document.getElementsByTagName("div")[0];
var iframe = parent.document
	.getElementsByTagName("iframe")[1];
var days = 60*60*24*1000;
var type_index = [
	"Fly Only",
	"Fly + Baggage",
	"Fly + Baggage + Meals"
]

function create_td(tr, v) {
	if (!v) {
		v = "";
	}
	
	var td = document.createElement("td");
	td.innerHTML = v;

	tr.appendChild(td);

	return td;
}

function create_row(tag) {
	var now = new Date(new Date().toDateString());
	var t = Math.floor((
		tag.depart.getTime()-now.getTime()
	)/days);
	var tr = document.createElement("tr");
	table[0].appendChild(tr);

	// Set to Bold if NOW.
	if (t === 0) {
		tr.setAttribute("bold", 1);
	}

	// 1st Column
	create_td(tr,
		t > 0 ? "SOON" :
		t === 0 ? "NOW" :
		""
	);

	// 2nd Column
	create_td(tr,
		tag.depart.toDateString() + "<br>" +
		tag.depart.toTimeString()
	);

	// 3rd Column
	create_td(tr,
		tag.from
	);

	// 4th Column
	create_td(tr,
		tag.to
	);

	// 5th Column
	var td = create_td(tr);
	let btn = document.createElement("input");
	btn.setAttribute("type", "submit");
	btn.value = "?";

	td.appendChild(btn);

	btn.addEventListener("click", (event) => {
		table[1].innerHTML = "<tr>\
<th>Seat</th>\
<th>Reference Number</th>\
<th>Type</th>\
<th>Cost</th>\
<th>Tax</th>\
<th>Flight Charge</th>\
<th>Total</th>";

		con.query(
			"SELECT\
				a.*\
			FROM\
				book a\
			WHERE\
				a.account_id = " + account_dat.id +
			" AND a.flight_id = " + tag.id,
			(err, rows) => {
			if (!err) {
				for (i = 0; i < rows.length; i++) {
					let tr = document
						.createElement("tr");
					table[1].appendChild(tr);

					// Seat
					create_td(tr,
						rows[i].seat
					);

					// Ref Num
					let v = ("0000000000" + 
						rows[i].id).slice(-10);

					create_td(tr,
						v.substring(0,5) +
						"<br>" +
						v.substring(5)
					);

					// Type
					create_td(tr,
						type_index[
							rows[i].bag_meal_auth
						]
					);

					// Cost
					create_td(tr,
						rows[i].cost + " PHP"
					);

					// Tax
					create_td(tr,
						rows[i].cost_tax + " PHP"
					);

					// Flight Charge
					create_td(tr,
						rows[i].cost_flight_charge +
							" PHP"
					);

					// Total
					create_td(tr,
						rows[i].cost +
						rows[i].cost_tax +
						rows[i].cost_flight_charge +
						" PHP"
					).setAttribute("bold", 1);
				}

				div.removeAttribute("hidden");
			} else {
				console.log(err);
			}
		})
		let tr = document.createElement("tr");
		table[1].appendChild(tr);
	})
}

if (con) {
	con.query(
		"SELECT a.*\
		FROM\
			flight a,\
			book b\
		WHERE\
			a.id = b.flight_id AND\
			b.account_id = " + account_dat.id + "\
		GROUP BY a.id\
		ORDER BY a.depart DESC, a.id",
		(err, rows) => {
		if (!err) {
			console.log(rows);
			for (i = 0; i < rows.length; i++) {
				create_row(rows[i]);
			}
		} else {
			console.log(err);
		}
	})
}

// Back
back.addEventListener("click", (event) => {
	iframe.setAttribute(
		"src",
		"./assets/html/account.html"
	);
})

// Okay
okay.addEventListener("click", (event) => {
	div.setAttribute("hidden", 1);
})