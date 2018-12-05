$(document).ready(function() {
	var toolAmount = 6;
	var tools = $('.toolbar');

	for (let i = 1; i <= toolAmount; i++) {
		tools.append("<div class='clickable-tool' id='rgb(0,0," + 42*i + ")' onclick='setrgb(0,0," + 42*i + ")'></div>" );
	}
	for (let i = 1; i <= toolAmount; i++) {
		tools.append("<div class='clickable-tool' id='rgb(0," + 42*i + ",0)' onclick='setrgb(0," + 42*i + ",0)'></div>" );
	}
	for (let i = 1; i <= toolAmount; i++) {
		tools.append("<div class='clickable-tool' id='rgb(" + 42*i + ",0,0)' onclick='setrgb(" + 42*i + ",0,0)'></div>" );
	}

	tools = $('.clickable-tool');
	for (let obj of tools) {
		obj.style.backgroundColor = obj.id;
		console.log(obj);
	}

});