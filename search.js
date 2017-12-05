var flight_type;

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

//search!
var elm = document.getElementsByTagName("input");

elm[12].addEventListener('click', (event) => {
	
})