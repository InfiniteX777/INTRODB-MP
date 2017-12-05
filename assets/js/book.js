var elm = document.getElementsByTagName("input");
	/* 0: First Name
	   1: Last Name
	   2: Middle Name
	   3: Male
	   4: Female
	   5: Nationality
	   6: Birthdate
	   7: Email Address
	   8: Area Code + Contact Number 1
	   9: Area Code + Contact Number 2
	   10: Passport Number
	   11: Country of Issue
	   12: Expiration Date
	   13: Card Number
	   14: Validation Number
	   15: Expiration Year
	   16: Expiration Month
	   17: Cardholder First Name
	   18: Cardholder Last Name
	   19: Street Address
	   20: Zip Code
	   21: City
	   22: Country
	   23: State/Region
	   24: Email Address (Card)
	   25: Area Code + Contact Number (Card)
	   26: Back
	   27: Submit
	*/
var iframe = parent.document
	.getElementsByTagName("iframe")[0];
var contact_pattern = /(\d+)/g;
	// since the contact has area code and number.

// Back
elm[26].addEventListener("click", (event) => {
	iframe.setAttribute(
		"src",
		"./assets/html/flight.html"
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
elm[27].addEventListener("click", (event) => {
	// translate
	var c = [
		elm[8].value.match(contact_pattern),
		elm[9].value.match(contact_pattern),
		elm[25].value.match(contact_pattern)
	]
	var v =
		g(0) + g(1) + g(2) + // name(f,l,m)
		t(elm[3].checked ? "0" : "1",true) + // gender
		g(5) + // nationality
		g(6) + // birthdate
		g(7) + // email
		t(c[0][0]) + t(c[0][1]) + // contact0
		t(c[1][0]) + t(c[1][1]) + // contact1
		g(10) + g(11) + g(12) + // passport
		g(13) + g(14) + // card
		t(elm[15].value + "-" + elm[16].value + "-1") +
		g(17) + g(18) + // cardholder name
		g(19) + g(20) + g(21) + g(22) + g(23) + // address
		g(24) + // card email
		t(c[2][0]) + t(c[2][1], false, true); // contact2

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
			(err) => {
				if (!err) {
					console.log("great!");
				} else {
					// http 500!
					console.log(err);
				}
			}
		)
	}
})