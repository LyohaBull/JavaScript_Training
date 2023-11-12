let p = document.createElement('p');
let p1 = document.createElement('p');
p.innerHTML = `frame_width: ${frame.contentWindow.innerWidth}, frame_height: ${frame.contentWindow.innerHeight}`;
frame.onload = function() {
/*		frame.contentDocument.body.append('Hello from main!');*/
    let href = null;
	try {
		href = frame.contentWindow.location.href;
	} catch(e) {
		p1.innerHTML = e.message;
	}
	
};
function sendMessage(){
	frame.contentWindow.postMessage(input.value,"*");
}
document.body.append(p);
document.body.append(p1);
window.addEventListener("message",(event)=>{
	let p = document.createElement("p");
	p.innerHTML = "Пришло от фрейма страницы: " + event.data;
	document.body.append(p);
});			
function sandbox(){
	frame.setAttribute("sandbox","");
}
function no_sandbox(){
	frame.removeAttribute("sandbox");
}