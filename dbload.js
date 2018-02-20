function loadDoc() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'dolldata.xml', true);

	xhr.timeout = 2000;

	xhr.onload = function () {
		var xmlDoc = this.responseXML;
		console.log(xmlDoc)
	};

	xhr.ontimeout = function (e) {
		console.log(e);
	};

	xhr.send(null)
};