/* / Login
   0: Email
   1: Password
   2: Back
   3: Login

   / Form
   4: First Name
   5: Last Name
   6: Middle Name
   7: Male
   8: Female
   9: Nationality
   10: Birthdate
   11: Email Address
   12: Area Code + Contact Number 1
   13: Area Code + Contact Number 2
   14: Passport Number
   15: Country of Issue
   16: Expiration Date
   17: Card Number
   18: Validation Number
   19: Expiration Year
   20: Expiration Month
   21: Cardholder First Name
   22: Cardholder Last Name
   23: Street Address
   24: Zip Code
   25: City
   26: Country
   27: State/Region
   28: Email Address (Card)
   29: Area Code + Contact Number (Card)
   30: Back
   31: Submit
*/
var elm = document.getElementsByTagName("input");
// indicator for any fields filled up properly.
var req = 0;
var elm_c = document.getElementsByTagName("c");
var iframe = parent.document
	.getElementsByTagName("iframe")[0];
// booking data.
var book_dat = [];
var book_index = [
	"name_first",
	"name_last",
	"name_midd",
	null,
	null,
	"nationality",
	null,
	"email",
	null,
	null,
	"passport_num",
	"passport_country_of_issue",
	null,
	"card_num",
	"card_val_num",
	null,
	null,
	"card_name_first",
	"card_name_last",
	"card_address",
	"card_zip",
	"card_city",
	"card_country",
	"card_region",
	"card_email",
	null
];

// Make sure that book_log_dat is deleted.
if (parent.book_log_dat) {
	delete parent.book_log_dat;
	delete parent.book_dat;
}

// Setup gender default value.
book_dat[3] = true;

// Recover book_dat if clicked 'back' button.
if (parent.book_dat) {
	req = 24;

	// Fill up the form.
	for (i = 0; i < 26; i++) {
		if (i !== 3 && i !== 4) {
			elm[i+4].value = parent.book_dat[i];

			elm[i+4].setAttribute("input_verify", 1);
		} else if (i === 3) {
			if (!parent.book_dat[3]) {
				elm[8].setAttribute("checked", 1);
			}
		}
	}

	book_dat = parent.book_dat;
}

// Setup input indicator.
for (i = 4; i <= 29; i++) {
	let n = i;

	if (i !== 7 && i !== 8) {
		// Disregard gender input.
		elm[i].addEventListener("input", (event) => {
			var v = event.target;
			let valid = v.value.length > 0;

			if (n === 12 || n === 13 || n === 29) {
				let res = v.value.match(/[^\s]+/g);

				if (!res || res.length < 2) {
					valid = false;
				}
			} else if (n === 19 || n === 20) {
				v.value = Math.max(
					v.getAttribute("min"),
					Math.min(
						Number(v.value) || 0,
						v.getAttribute("max")
					)
				);
			}

			book_dat[n-4] = v.value;

			if (valid &&
			    !v.hasAttribute("input_verify")) {

				req++;
				v.setAttribute("input_verify",1);
			} else if (!valid &&
					   v.hasAttribute("input_verify")) {
				req--;
				v.removeAttribute("input_verify");
			}
		})
	} else {
		elm[i].addEventListener("click", (event) => {
			book_dat[3] = n === 7;
		})
	}
}

// Back Buttons
elm[2].addEventListener("click", (event) => {
	iframe.setAttribute(
		"src",
		"./assets/html/seat.html"
	);
})

elm[30].addEventListener("click", (event) => {
	iframe.setAttribute(
		"src",
		"./assets/html/seat.html"
	);
})

// Writes it to a machine-readable format.
function t(v,n,c) {
	var s = (n ? "" : '"');

	return s + v + s + (c ? "" : ",");
}

// Directly collects from the elm array.
function g(i,n,c) {
	return t(elm[i].value,n,c);
}

// Submit
elm[31].addEventListener("click", (event) => {
	// 24 is the total non-gender input.
	if (req < 24) {
		elm_c[1].innerHTML =
			"You need to fill up the form!";
	} else {
		var con = parent.connection;

		if (con) {
			con.query(
				"SELECT id FROM account\
				WHERE email = \"" +
					elm[11].value.toLowerCase() +
				"\"",
				(err, rows) => {
				if (!err) {
					if (rows.length > 0) {
						elm_c[1].innerHTML =
							"Email is already used!";
					} else {
						parent.book_dat = book_dat;

						iframe.setAttribute(
							"src",
							"./assets/html/summary.html"
						);
					}
				} else {
					console.log(err);
				}
			})
		} else {
			elc_c[1].innerHTML = "No connection...";
		}
	}
})

function format_date(v) {
	var zero = "00";
	var ret =
		v.getFullYear() + "-" +
		(zero + (v.getMonth()+1)).slice(-2) + "-" +
		(zero + v.getDate()).slice(-2);
	
	return ret;
}

// Login
elm[3].addEventListener("click", (event) => {
	var con = parent.connection;

	if (con) {
		con.query(
			"SELECT a.*\
			FROM\
				account a,\
				credential b\
			WHERE\
				a.id = b.account_id AND\
				a.email = \"" + elm[0].value + "\"\ AND\
				b.password = \"" + elm[1].value + "\"",
			(err, rows) => {
			if (!err && rows.length > 0) {
				for (i = 0; i < 26; i++) {
					if (i === 3 || i === 4) {
						book_dat[3] =
							rows[0].gender === 0;
					} else if (i === 6) {
						book_dat[i] = format_date(
							rows[0].birthdate
						);
					} else if (i === 8) {
						book_dat[i] =
							rows[0].contact0_area_code +
							" " + rows[0].contact0_num;
					} else if (i === 9) {
						book_dat[i] =
							rows[0].contact1_area_code +
							" " + rows[0].contact1_num;
					} else if (i === 12) {
						book_dat[i] = format_date(
							rows[0].passport_exp_date
						);
					} else if (i === 15) {
						book_dat[i] =
							rows[0].card_exp
								.getFullYear();
					} else if (i === 16) {
						book_dat[i] =
							rows[0].card_exp
								.getMonth()+1;
					} else if (i == 25) {
						book_dat[i] =
							rows[0].card_area_code +
							" " +
							rows[0].card_contact_num;
					} else {
						book_dat[i] = rows[0]
							[book_index[i]];
					}
				}

				parent.book_dat = book_dat;
				parent.book_log_dat = rows[0];

				iframe.setAttribute(
					"src",
					"./assets/html/summary.html"
				);
			} else {
				elm_c[0].innerHTML = "Incorrect email \
					or password!";
			}
		})
	} else {
		elm_c[0].innerHTML = "No connection...";
	}
})