var selected_menu;

global.menuClick = function(self) {
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

		document
			.getElementById("table-of-contents")
			.getElementsByTagName("h3")[0].style.color = color;

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