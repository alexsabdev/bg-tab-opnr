(function() {
	'use strict';

	var backgroundpage= chrome.extension.getBackgroundPage();
	document.querySelector('#open-tabs').addEventListener('click', function() {
		var start = document.querySelector('#start').value;
		var end = document.querySelector('#end').value;
		backgroundpage.handleButtonClick(start, end);
	})

})();
