var loc = [
	// Australia
	"Gold Coast",
	"Melbourne",
	"Perth",
	"Sydney",
	// Bangladesh
	"Shahjalal",
	// Brunei Darussalam
	"Bandar Seri",
	"Begawan (Brunei)",
	// Cambodia
	"Siem Reap",
	// China
	"Beijing",
	"Guangzhou (Canton)",
	"Haikou Meilan",
	"Hangzhou Xaioshan",
	"Nanjing",
	"Ningbo Lishe",
	"Qingdao",
	"Shanghai",
	"Shenyang",
	"Shenzhen Bao'an",
	"Tianjin",
	"Xiamen",
	"Xi'an Xianyang",
	// Hong Kong
	"Hong Kong",
	// India
	"Amritsar",
	"Bengaluru",
	"Chennai",
	"Cochin",
	"Rajiv Gandhi",
	"Tiruchirappalli",
	// Indonesia
	"Bali (Denpasar)",
	"Jakarta",
	"Surabaya",
	// Japan
	"Fukuoka",
	"Nagoya",
	"Osaka (Kansai)",
	"Sapporo (Hokkaido)",
	"Tokyo (Narita)",
	// Macau
	"Macau",
	// Malaysia
	"Ipoh",
	"Kota Kinabalu",
	"Kuala Lumpur",
	"Langkawi",
	"Penang",
	// Maldives
	"Male",
	// Philippines
	"Bacolod",
	"Bohold (Tagbilaran)",
	"Boracay (Caticlan)",
	"Butuan",
	"Cagayan de Oro",
	"Calbayog",
	"Camiguin",
	"Cauayan",
	"Cebu",
	"Clark",
	"Coron (Busuanga)",
	"Cotabato",
	"Davao",
	"Dipolog",
	"Dumaguete",
	"General Santos",
	"Iloilo",
	"Kalibo",
	"Legazpi",
	"Manila",
	"Masbate",
	"Naga",
	"Ormoc",
	"Ozmiz",
	"Pagadian",
	"Puerto Princesa",
	"Roxas",
	"San Jose (Mindoro)",
	"Siargao",
	"Surigao",
	"Tablas",
	"Tacloban",
	"Tandag",
	"Tawi-Tawi",
	"Tuguegarao",
	"Virac",
	"Zamboanga",
	// Singapore
	"Singapore",
	// South Korea
	"Busan",
	"Seoul (Incheon)",
	// Taiwan
	"Kaochsiung",
	"Taipei",
	// Thailand
	"Bangkok",
	"Chiang Mai",
	"Hat Yai",
	"Krabi",
	"Phuket",
	// United Arab Emirates
	"Dubai",
	// United States of America
	"Guam",
	// Vietnam
	"Hanoi",
	"Ho Chi Minh"
]
var loc_index = {}; // Faster way for verification.
var flight_type;

var warn = document.getElementsByTagName("a")[0];
	// The warning label.
var datalist = document
	.getElementsByTagName("datalist")[0];
	// The datalist for locations.

// Setup datalist.
for (i = 0; i < loc.length; i++) {
	loc_index[loc[i]] = 1;
	datalist.innerHTML +=
		"<option value=\"" + loc[i] + "\">";
}

function countInput(self) {
	if (self.name === "adult") {
		var children = document.getElementsByName("children")[0];
		var infant = document.getElementsByName("infant")[0];
		var v = parseInt(children.value);

		if (parseInt(self.value) === 0 && v > 2) {
			children.value = 2;
		} else if (self.value >= 20 - v) {
			self.value = 20 - v;
		}

		v = parseInt(infant.value);

		if (v > self.value) {
			infant.value = self.value;
		}
	} else {
		var v = parseInt(
			document.getElementsByName("adult")[0].value
		);

		if (self.name === "children") {
			if (v === 0 && parseInt(self.value) > 2) {
				self.value = 2;
			} else if (self.value >= 20 - v) {
				self.value = 20 - v;
			}
		} else {
			if (self.value > v) {
				self.value = v;
			}
		}
	}
}

function flightTypeClick(self) {
	if (flight_type) {
		flight_type.parentElement.removeAttribute("style");
	}

	var v = document.getElementsByName("date-return")[0];

	if (self.value == 0) {
		v.setAttribute("disabled", "1");
		v.setAttribute(
			"style",
			"cursor: not-allowed; color: var(--red); background-color: var(--red);"
		);
	} else {
		v.removeAttribute("disabled");
		v.removeAttribute("style");
	}

	v = [
		document.getElementsByName("loc-from1")[0],
		document.getElementsByName("loc-to1")[0]
	];
	var index = [
		"From",
		"To"
	]

	for (i = 0; i < 2; i++) {
		if (self.value == 2) {
			v[i].removeAttribute("disabled");
			v[i].removeAttribute("style");
			v[i].setAttribute(
				"placeholder",
				index[i]
			);
		} else {
			v[i].setAttribute("disabled", "1");
			v[i].setAttribute(
				"style",
				"cursor: not-allowed; color: var(--red); background-color: var(--red);"
			);
			v[i].removeAttribute("placeholder");
		}
	}

	self.setAttribute("checked", "checked");

	self.parentElement.setAttribute(
		"style",
		"box-shadow: 0 0 10px #000; color: #fff; background-color: var(--red);"
	);

	flight_type = self;
}

flightTypeClick(document.getElementsByName("flight-type")[0]);

// input setup
var elm = document.getElementsByTagName("input");
var iframe = parent.document.getElementsByTagName("iframe")[0];

// depart date
elm[7].addEventListener("change", (event) => {
	// set min value based on depart date and reset it.
	elm[8].setAttribute("min", elm[7].value);
	elm[8].value = "";
})

// submit
elm[12].addEventListener("click", (event) => {
	if (// check depart from and to.
		loc_index[elm[3].value] &&
		loc_index[elm[4].value] &&
		(// check if multi-city and return from and to.
		 flight_type.value !== "2" ||
		 loc_index[elm[5].value] &&
		 loc_index[elm[6].value]) &&
		// check depart date
		elm[7].value &&
		(/* check if not one-way and second depart date
			(aka return date).
		 */
		 flight_type.value === "0" ||
		 elm[8].value)) {
		parent.search_dat = [
			flight_type.value, // flight type
			elm[3].value, // depart from
			elm[4].value, // depart to
			elm[5].value, // return from
			elm[6].value, // return to
			elm[7].value, // depart date
			elm[8].value, // return date
			elm[9].value, // adult
			elm[10].value, // child
			elm[11].value // infant
		];
		iframe.setAttribute("src", "./assets/html/flight.html");
	} else {
		warn.innerHTML =
			"You need to fill up the form properly!";
	}
})