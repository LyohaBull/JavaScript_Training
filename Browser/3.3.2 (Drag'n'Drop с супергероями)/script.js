document.addEventListener("mousedown",function(event){
	if (!event.target.classList.contains("draggable")) return;
	event.preventDefault();
	let shiftX = event.clientX - event.target.getBoundingClientRect().left;
	let shiftY = event.clientY - event.target.getBoundingClientRect().top;
	if (event.target.style.position != "absolute")
		event.target.style.position = "absolute";
	if (event.target.style.zIndex != 1000)
		event.target.style.position = 1000;
	let elem = event.target;
	moveAt(event.pageX,event.pageY);

	function moveAt(pageX,pageY){
		let uleft = (pageX > shiftX) ? (pageX > document.documentElement.clientWidth-elem.offsetWidth+shiftX) ? document.documentElement.clientWidth-elem.offsetWidth+shiftX-pageX : 0 : shiftX-pageX;
		let utop = (pageY > shiftY) ? (pageY > document.documentElement.clientHeight-elem.offsetHeight+shiftY) ? document.documentElement.clientHeight-elem.offsetHeight+shiftY-pageY : 0 : shiftY-pageY;
		
		elem.style.left = pageX - shiftX + uleft + "px";
        elem.style.top = pageY - shiftY + utop + "px";

	}
	function onMouseMove(event){
		moveAt(event.pageX,event.pageY);
	}
	document.addEventListener("mousemove",onMouseMove);
	document.addEventListener("mouseup",onMouseUp);
	function onMouseUp(){
		document.removeEventListener("mousemove",onMouseMove);
		document.removeEventListener("mouseup",onMouseUp);
	}
	event.target.ondragstart = function(){return false;};
});