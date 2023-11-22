
/*Правильный код для доменов
if (top.document.domain == document.domain) {
	protector.remove();
}*/
/*Псевдокод*/
let top1 = {
	document: {
		domain: "bad.ru"
	}
};
let document1 = {
	domain: "our.ru"
}
window.addEventListener("message",(event)=>{
	if (event.data == "security") security();
	else no_security();
});
function security(){
	let protector = document.querySelector('.protector');
	if (!protector) {
		let protector = document.createElement("div");
		protector.classList.add("protector");
		document.body.prepend(protector);
	};
	if (top1.document.domain == document1.domain) {
		
		protector.remove();
	}
}
function no_security(){
	let protector = document.querySelector('.protector');
	if (protector) protector.remove();
}