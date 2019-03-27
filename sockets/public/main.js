$(document).ready(function() {

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
