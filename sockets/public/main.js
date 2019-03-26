$(document).ready(function() {
	// var toolAmount = 10;
	// var tools = $('.toolbar');

	// for (let i = 1; i <= toolAmount; i++) {
  //   tools.append("<div class='clickable-tool' id='rgb(0,0," + 
  //     Math.round((255/toolAmount)*i) +
  //     ")' onclick='setrgb(0,0," + Math.round((255/toolAmount)*i) + ")'></div>" );
  // }
  // tools.append("<br />");
	// for (let i = 1; i <= toolAmount; i++) {
  //   tools.append("<div class='clickable-tool' id='rgb(0," + 
  //     Math.round((255/toolAmount)*i) +
  //     ",0)' onclick='setrgb(0," + Math.round((255/toolAmount)*i) + ",0)'></div>" );
	// }
  // tools.append("<br />");
	// for (let i = 1; i <= toolAmount; i++) {
  //   tools.append("<div class='clickable-tool' id='rgb(" + 
  //     Math.round((255/toolAmount)*i) +
  //     ",0,0)' onclick='setrgb(" + Math.round((255/toolAmount)*i) + ",0,0)'></div>" );
	// }
  // tools.append("<br />");
	// for (let i = 1; i <= toolAmount; i++) {
  //   tools.append("<div class='clickable-tool' id='rgb(" + 
  //     Math.round((255/toolAmount)*i) +
  //     ",0,0)' onclick='setrgb(" + Math.round((255/toolAmount)*i) + ",0,0)'></div>" );
  // }
  // tools.append("<br />");
	// for (let i = 1; i <= toolAmount; i++) {
  //   tools.append("<div class='clickable-tool' id='rgb(" + 
  //     Math.round((255/toolAmount)*i) +
  //     ",0,0)' onclick='setrgb(" + Math.round((255/toolAmount)*i) + ",0,0)'></div>" );
  // }
  // tools.append("<br />");
	// for (let i = 1; i <= toolAmount; i++) {
  //   tools.append("<div class='clickable-tool' id='rgb(" +
  //     Math.round((255/toolAmount)*i) +
  //     ",0,0)' onclick='setrgb(" + Math.round((255/toolAmount)*i) + ",0,0)'></div>" );
  // }
  
	// tools = $('.clickable-tool');
	// for (let obj of tools) {
	// 	obj.style.backgroundColor = obj.id;
	// 	// console.log(obj);
	// }

  // $(".chat").on("drag", handleDrag(this))
  for(elem of document.getElementsByClassName("draggable-widget")) {
    console.log(elem)
    elem.addEventListener("drag", function(event){
      // console.log(event.target.parentElement)
      var container = event.target.parentElement;
      container.style.left = window.mouseX + "px";
      container.style.top = window.mouseY + "px";
    });
  };


});
