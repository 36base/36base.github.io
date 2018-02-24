function searchFunction() {
	var input, filter, wrapper, a, i;
	input = document.getElementById("dollsearchbar");
	filter = input.value.toUpperCase();
	wrapper = document.getElementById("dollwrap");
	div = wrapper.getElementsByClassName("doll-card");
	b = document.getElementsByClassName("doll-link-text");
	c = document.getElementsByClassName("nick");
	for (i = 0; i< div.length; i++) {
		if (b[i].innerHTML.toUpperCase().indexOf(filter)>-1) {
			div[i].style.display ="";
		}
		else {
			div[i].style.display="none";
		}
	}
	for (i = 0; i< div.length; i++) {
		if (c[i].innerHTML.toUpperCase().indexOf(filter)>-1) {
			div[i].style.display ="";
		}
		else {
			div[i].style.display="none";
		}
	}
}
