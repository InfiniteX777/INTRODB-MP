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

loc.sort();

// Faster way for verification.
var loc_index = {};
var flight_type = 1;

var elm_a = document.getElementsByTagName("a")[0];
var input = document.getElementsByTagName("input");
var select = document.getElementsByTagName("select");
var elm_b = document.getElementsByTagName("b");
var iframe = parent.document
	.getElementsByTagName("iframe")[0];

// Setup 'select' options.
for (i = 0; i < loc.length; i++) {
	var v = "<option>" + loc[i] + "</option>";
	loc_index[loc[i]] = 1;

	select[0].innerHTML += v;
	select[1].innerHTML += v;
	select[2].innerHTML += v;
	select[3].innerHTML += v;
}

// Setup 'flight-type'

for (i = 0; i < 3; i++) {
	let n = i;

	elm_b[i].addEventListener("click", (event) => {
		var t = event.target;

		elm_b[flight_type].removeAttribute("selected");

		flight_type = n;

		t.setAttribute("selected", 1);

		if (n === 0) {
			select[2].setAttribute("disabled", 1);
			select[3].setAttribute("disabled", 1);
			input[1].setAttribute("disabled", 1);
		} else {
			input[1].removeAttribute("disabled");

			if (n === 1) {
				select[2].setAttribute("disabled", 1);
				select[3].setAttribute("disabled", 1);
			} else {
				select[2].removeAttribute("disabled");
				select[3].removeAttribute("disabled");
			}
		}
	})
}

elm_b[0].click();

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

// depart date
input[0].addEventListener("change", (event) => {
	// set min value based on depart date and reset it.
	input[1].setAttribute("min", input[0].value);
	input[1].value = "";
})

// submit
input[5].addEventListener("click", (event) => {
	if (// check depart from and to.
		loc_index[select[0].value] &&
		loc_index[select[1].value] &&
		(// check if multi-city and return from and to.
		 flight_type !== 2 ||
		 loc_index[select[2].value] &&
		 loc_index[select[3].value]) &&
		// check depart date
		input[0].value &&
		(/* check if not one-way and second depart date
			(aka return date).
		 */
		 flight_type === 0 ||
		 input[1].value)) {
		if (flight_type === 1) {
			// setup round-trip.
			select[2].value = select[1].value;
			select[3].value = select[0].value;
		}

		parent.search_dat = [
			flight_type, // flight type
			select[0].value, // depart from
			select[1].value, // depart to
			select[2].value, // return from
			select[3].value, // return to
			input[0].value, // depart date
			input[1].value, // return date
			input[2].value, // adult
			input[3].value, // child
			input[4].value // infant
		];
		iframe.setAttribute("src", "./assets/html/flight.html");
	} else {
		elm_a.innerHTML =
			"You need to fill up the form properly!";
	}
})