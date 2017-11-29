console.log(document.getElementsByTagName("table"));
var elm = document.getElementsByTagName("table")[1];

function createNode(price,tr) {

	for (n = 0; n < 4; n++) {
		var a = document.createElement("td");
		tr.appendChild(a);

		var b = document.createElement("input");
		b.setAttribute("type", "radio");
		b.setAttribute("name", "flight-choice");
		b.innerHTML = "P " + price;
	}
}

var index = ["fare_seat", "fare_baggage", "fare_meal"];

function getFlightList(list) {
	elm.innerHTML = ''; // clear everything.
	for (i = 0; i < list.length; i++) {
		var a = document.createElement("tr");
		elm.appendChild(a);

		for (n = 0; n < 3; n++) {
			if (list[index[n]]) {
				createNode(list[index[n]], a);
			}
		}
	}
}

getFlightList({
	"fare_seat": "1000"
});