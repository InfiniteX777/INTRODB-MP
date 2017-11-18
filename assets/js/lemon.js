const {BrowserWindow} = require('electron');
const path = require('path');
const url = path.join('file://', __dirname, '../../assets/html/dialog.html');

var _electronPrompt_col = {};

this.prompt = function(parent, title, callback) {
	let win = new BrowserWindow({
		width: 300,
		height: 50,
		useContentSize: true,
		resizable: false,
		minimizable: false,
		maximizable: false,
		fullscreenable: false,
		title: title,
		parent: parent,
		modal: true
	});

	win.setMenu(null);
	win.loadURL(url);
	win.callback = callback;
	_electronPrompt_col[win] = 1;

	win.on('closed', () => {
		_electronPrompt_col[win] = null;
		win = null;
	})

	win.show()
}