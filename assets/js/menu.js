var toolbar = document.getElementById("toolbar");
var div = document.getElementById("input");
var input = document.getElementsByTagName("input");
var elm_h3 = document.getElementsByTagName("h3")[0];
var selected_menu;

// Toolbar
input[0].addEventListener("click", (event) => {
	remote.BrowserWindow.getFocusedWindow().minimize();
})

input[1].addEventListener("click", (event) => {
	window.close();
})

function menuClick(self) {
	if (selected_menu != self) {
		var view // View for the specified menu.

		// Clear previous menu.
		if (selected_menu) {
			selected_menu.removeAttribute("style");

			view = document.getElementsByName(selected_menu.getAttribute("view"))[0];

			if (view) {
				view.setAttribute("hidden", "hidden");
			}
		}

		var color = self.getAttribute("tab-color");
		selected_menu = self;

		elm_h3.style.color = color;
		toolbar.style["background-color"] = color;
		div.style["background-color"] = color;

		self.setAttribute(
			"style",
			"text-indent: 20px; color: #fff; background-color: " +
			color +
			";"
		);

		// Change View
		view = document.getElementsByName(self.getAttribute("view"))[0];

		if (view) {
			view.removeAttribute("hidden");
		}
	}
}

menuClick(document.getElementsByTagName("menu")[0]);

//super top secret stuff

const lemon = remote.require('./assets/js/lemon');
const self = remote.getCurrentWindow();

var btn = document.getElementsByName("admin-access")[0];
let f;

function setupSuperTopSeekrit() {
	document.addEventListener("keydown", function (e) {
		if (e.which === 123) {
			remote.getCurrentWindow().toggleDevTools();
		} else if (e.which === 116) {
			location.reload();
		}
	});
}

f = function(event) {
	lemon.prompt(self, "Admin Access Authentication",
		function(v) {
			if (v === "1234") {
				document
					.getElementById("tab-4")
					.removeAttribute("hidden");
				btn.removeEventListener('click', f);

				elm_h3.innerHTML = "ADMIN_AUTH_GRANTED";
				setupSuperTopSeekrit();
			}
	});
}

btn.addEventListener('click', f);