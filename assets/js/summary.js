var search_dat = parent.search_dat;
var selected_fare = parent.selected_fare;
var selected_seat = parent.selected_seat;
var book_dat = parent.book_dat;
var book_log_dat = parent.book_log_dat;
var board_dat = [[],[]];
var input = document.getElementsByTagName("input");
var h3 = document.getElementsByTagName("h3")[2];
var div = document.getElementsByTagName("div");
var iframe = parent.document
	.getElementsByTagName("iframe")[0];
// since the contact has area code and number.
var contact_pattern = /(\d+)/g;
var fare_index = ["fare_seat",
				  "fare_baggage",
				  "fare_meal"];
var passengers = Number(search_dat[7]) +
				 Number(search_dat[8]) +
				 Number(search_dat[9]);
// Total amount to pay.
var total = 0;
// Booked Seats Registered Counter.
var seat_reg = selected_seat[0].length;

if (search_dat[0] !== "0") {
	seat_reg *= 2;
}

// Write down the summary.

/// Personal Information
div[0].innerHTML += "<p>" +
	(book_dat[3] ? "Mr. " : "Ms. ") +
	book_dat[0] + " " + book_dat[2] + " " +
		book_dat[1] +
	"<br>Nationality: " + book_dat[5] +
	"<br>Birthdate: " + book_dat[6] +
	"<br><br>Email: " + book_dat[7] +
	"<br>Contact #1: " + book_dat[8] +
	"<br>Contact #2: " + book_dat[9] +
	"<br><br>Passport: " + book_dat[10] + " " +
		book_dat[11] +
	"<br>Expiration Date: " + book_dat[12] +
	"<br><br>Card Number: " + book_dat[13] +
	"<br>Validation Number: " + book_dat[14] +
	"<br>Expiration: " + ("00" + book_dat[16]).slice(-2) +
		"-" + book_dat[15] +
	"<br>Cardholder: " + book_dat[17] + " " +
		book_dat[18] +
	"<br><br>Street Address: " + book_dat[19] +
	"<br>Zip Code: " + book_dat[20] + " " +
		book_dat[21] +
	"<br>Location: " + book_dat[22] + ", " +
		book_dat[23] +
	"<br>Card Email: " + book_dat[24] +
	"<br>Card Contact: " + book_dat[25] +
	"</p>";

/// Boarding Information
div[1].innerHTML += "<p>" +
	"Adult: " + search_dat[7] +
	"<br>Children: " + search_dat[8] +
	"<br>Infant: " + search_dat[9] +
	"<br>Total Passengers: " + passengers +
	"</p>";

function setBoardInfo(i, from, to, depart) {
	var seat = "";
	var fare = Number(selected_fare[i][
		fare_index[selected_fare[i].selected
	]]);
	var tax = Number(selected_fare[i].tax);
	var charge = Number(selected_fare[i].flight_charge);
		/* Requesting numbers will always be returned
		   as a string.
		*/
	var price = fare+tax+charge;

	for (var k in selected_seat[i]) {
		if (k !== "length") {
			if (seat.length > 0) {
				seat += ", " + k;
			} else {
				seat = k;
			}
		}
	}

	div[i+2].innerHTML += "<h4>" +
		from + " to " + to +
		"</h4><p>" +
		"Departure: " + selected_fare[i].depart +
		"<br>Seats: " + seat +
		"<br><br>Fare: " + fare + " PHP" +
		"<br>Tax: " + tax + " PHP" +
		"<br>Flight Charge: " + charge + " PHP" +
		"<br>Total: " + (price*passengers) + " PHP (" +
			price + " PHP per Passenger)" +
		"</p>";

	total += price*passengers;
		// Add to total.
}

setBoardInfo(0, search_dat[1], search_dat[2]);

if (search_dat[0] !== "0") {
	setBoardInfo(1, search_dat[3], search_dat[4]);
}

/// Total Amount
h3.innerHTML = "Total Amount: " + total + " PHP";

// Writes it to a machine-readable format.
function t(v,n,c) {
	var s = (n ? "" : '"');

	return s + v + s + (c ? "" : ",");
}

// Directly collects from the book_dat array.
function g(i,n,c) {
	return t(book_dat[i],n,c);
}

// Back
input[0].addEventListener("click", (event) => {
	iframe.setAttribute(
		"src",
		"./assets/html/book.html"
	);
})

// Persistent MySQL query!
function query_persist(query, i) {
	var con = parent.connection;

	if (con) {
		con.query(query, (err, res) => {
			if (err) {
				query_persist(query);
			} else {
				board_dat[i].push(
					("0000000000" + res.insertId)
						.slice(-10)
				);

				seat_reg--;

				// Go to next page.
				if (seat_reg === 0) {
					// Clean up.
					delete parent.book_dat;
					delete parent.book_log_dat;
					delete parent.seleted_fare;
					delete parent.selected_seat;

					parent.board_dat = board_dat;

					iframe.setAttribute(
						"src",
						"./assets/html/done.html"
					);
				}
			}
		})
	}
}

// Write a book that is not in a literary way.
function make_book(i, id) {
	for (var k in selected_seat[i]) {
		if (k !== "length") {
			query_persist(
"INSERT INTO book (\
	flight_id,\
	account_id,\
	seat,\
	bag_meal_auth,\
	cost,\
	cost_tax,\
	cost_flight_charge\
) VALUES (" +
selected_fare[i].id + "," +
id + ",\"" +
k + "\"," +
selected_fare[i].selected + "," +
selected_fare[i]
	[fare_index[selected_fare[i].selected]] +
"," + selected_fare[i].tax + "," +
selected_fare[i].flight_charge +
")",
				i
			);
		}
	}
}

function finalize(id) {
	make_book(0, id);

	if (search_dat[0] !== "0") {
		make_book(1, id);
	}
}

// Submit
input[1].addEventListener("click", (event) => {
	if (book_log_dat) {
		finalize(book_log_dat.id);
	} else {
		// translate
		var c = [
			book_dat[8].match(contact_pattern),
			book_dat[9].match(contact_pattern),
			book_dat[25].match(contact_pattern)
		]
		var v =
			// name(f,l,m)
			g(0) + g(1) + g(2) +
			// gender
			t(book_dat[3] ? "0" : "1",true) +
			// gender
			g(5) +
			// birthdate
			g(6) +
			// email
			g(7) +
			// contact0
			t(c[0][0]) + t(c[0][1]) +
			// contact1
			t(c[1][0]) + t(c[1][1]) +
			// passport
			g(10) + g(11) + g(12) +
			// card
			g(13) + g(14) +	t(book_dat[15] +
				"-" + book_dat[16] + "-1") +
			// cardholder name
			g(17) + g(18) +
			// address
			g(19) + g(20) + g(21) + g(22) + g(23) +
			// card email
			g(24) +
			// contact2
			t(c[2][0]) + t(c[2][1], false, true);

		// send
		var con = parent.connection;
		if (con) {
			con.query(
"INSERT INTO account (\
	name_first,\
	name_last,\
	name_midd,\
	gender,\
	nationality,\
	birthdate,\
	email,\
	contact0_area_code,\
	contact0_num,\
	contact1_area_code,\
	contact1_num,\
	passport_num,\
	passport_country_of_issue,\
	passport_exp_date,\
	card_num,\
	card_val_num,\
	card_exp,\
	card_name_first,\
	card_name_last,\
	card_address,\
	card_zip,\
	card_city,\
	card_country,\
	card_region,\
	card_email,\
	card_area_code,\
	card_contact_num\
) VALUES (" + v + ")",
				(err,res) => {
					if (!err) {
						finalize(res.insertId);
					} else {
						// http 500!
						console.log(err);
					}
			})
		}
	}
})