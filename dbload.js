function loadDoc() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'dolldata.xml', true);

	xhr.timeout = 2000;

	xhr.onload = function () {
		var xmlDoc = this.responseXML;
		x=xmlDoc.documentElement.childNodes;
		for (i=0; i<x.length; i++) {
			console.log(x[i].nodeName + ": " + x[i].childNodes[0]);
		}
	};

	xhr.ontimeout = function (e) {
		console.log(e);
	};

	xhr.send(null)
};