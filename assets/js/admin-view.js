const remote = require('electron').remote;
const lemon = remote.require('./assets/js/lemon');
const self = remote.getCurrentWindow();

var btn = document.getElementsByName("admin-access")[0];
let f;

f = function(event) {
	lemon.prompt(self, "Admin Access Authentication",
		function(v) {
			if (v === "1234") {
				document
					.getElementById("tab-4")
					.removeAttribute("hidden");
				btn.removeEventListener('click', f);
				self.innerHTML = "ADMIN";
			}
	});
}

btn.addEventListener('click', f);