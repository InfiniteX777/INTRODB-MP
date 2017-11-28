const {BrowserWindow} = require('electron');
const path = require('path');
const url = path.join('file://', __dirname, '../../assets/html/dialog.html');

this.prompt = function(parent, title, callback) {
	var win = new BrowserWindow({
		width: 300,
		height: 100,
		resizable: false,
		minimizable: false,
		maximizable: false,
		fullscreenable: false,
		title: title,
		parent: parent
	});

	win.setMenu(null);
	win.loadURL(url);
	win.callback = callback;

	win.on('closed', () => {
		win = null;
	})

	win.show()
}