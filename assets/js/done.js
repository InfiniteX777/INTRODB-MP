var search_dat = parent.search_dat;
var board_dat = parent.board_dat;
var input = document.getElementsByTagName("input")[0];
var h3 = document.getElementsByTagName("h3");
var elm_p = document.getElementsByTagName("p");
var iframe = parent.document
	.getElementsByTagName("iframe")[0];

// Setup numbers.
function setup(i, from, to) {
	h3[i].innerHTML = from + " to " + to;

	for (n = 0; n < board_dat[i].length; n++) {
		let v = document.createElement("a");
		v.innerHTML = board_dat[i][n] + "<br>";

		elm_p[i+1].appendChild(v);
	}
}

setup(0, search_dat[1], search_dat[2]);

if (search_dat[0] !== 0) {
	setup(1, search_dat[3], search_dat[4]);
}

input.addEventListener("click", (event) => {
	iframe.setAttribute(
		"src",
		"./assets/html/search.html"
	);
})