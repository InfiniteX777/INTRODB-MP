let elm = [];
let prefix = [
	"Hello there, ",
	"Last logged ",
	"Email: ",
	"Nationality: "
];

elm[0] = document.createElement("h2");
document.body.appendChild(elm[0]);

for (i = 1; i <= 4; i++) {
	elm[i] = document.createElement("h3");
	document.body.appendChild(elm[i]);
}

function updateDetails(detail) {
	elm[0].innerHTML = 
		prefix[0] +
		(detail[1] == 0 ? "Mr. " : "Ms. ") +
		detail[0] + "!";

	for (i = 1; i <= 3; i++) {
		elm[i].innerHTML =
		prefix[i] +
		detail[i + 1];
	}
}

updateDetails([
	"Bob Ross",
	0,
	"9:00 PM 11/25/2017",
	"bob_ross@bob.com",
	"unknown"
]);