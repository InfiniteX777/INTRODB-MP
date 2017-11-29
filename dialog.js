const remote = require('electron').remote;
const self = remote.getCurrentWindow();
var elm = document.getElementsByTagName("input");

function f(event) {
	if (self.callback != null &&
	    typeof(self.callback) === "function") {
		self.callback(elm[0].value);
	}

	self.close();
}

elm[0].addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		f(event);
	}
})

elm[1].addEventListener('click', f)

elm[0].focus();