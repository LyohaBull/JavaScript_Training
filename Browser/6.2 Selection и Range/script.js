function select() {
	let range = new Range();
	range.setStart((p1.childNodes[start.value].hasChildNodes()) ? p1.childNodes[start.value].firstChild: p1.childNodes[start.value],startOff.value);
	range.setEnd((p1.childNodes[end.value].hasChildNodes()) ? p1.childNodes[end.value].firstChild: p1.childNodes[end.value],endOff.value);
	document.getSelection().removeAllRanges();
	document.getSelection().addRange(range);
	span.innerHTML = `   ${range.startContainer}:${range.startOffset} ${range.endContainer}:${range.endOffset} ${range.collapsed} ${range.commonAncestorContainer}`;
}
let range2 = new Range();
range2.setStart(p2.firstChild,2);
range2.setEnd(p2.querySelector('b').firstChild,3);
window.getSelection().removeAllRanges();
let methods = {
	deleteContents(){
		range2.deleteContents()
	},
	extractContents(){
		let content = range2.extractContents();
		result.innerHTML="";
		result.append("Извлечено: ",content);
	},
	cloneContents(){
		let content = range2.cloneContents();
		result.innerHTML="";
		result.append("Клонировано: ",content);
	},
	insertNode(){
		let newNode = document.createElement('u');
		newNode.innerHTML = "НОВЫЙ УЗЕЛ";
		range2.insertNode(newNode);
	},
	surroundContents(){
		let newNode = document.createElement('u');
		try {
			range2.surroundContents(newNode);
		}catch(e) {alert(e)}
	},
	resetExample() {
		p2.innerHTML = `>Example: <i>italic</i> and <b>bold</b>`;
		result.innerHTML="";
		range2.setStart(p2.firstChild,2);
		range2.setEnd(p2.querySelector('b').firstChild,3);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range2);
	}
};
for (let method in methods) {
	document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
}
methods.resetExample();
document.onselectionchange = function(){
	let {anchorNode,anchorOffset,focusNode,focusOffset} = document.getSelection();
	start1.value = `${anchorNode && anchorNode.data}:${anchorOffset}`;
	end1.value = `${focusNode && focusNode.data}:${focusOffset}`;
};
input.onselect = function(){
	input.value = input.value.substr(input.selectionStart,input.selectionEnd-input.selectionStart);
}
area.onfocus =()=>{
	setTimeout(()=>{area.selectionStart=area.selectionEnd=0;});
};
button1.onclick=()=>{
	if (input1.selectionStart == input1.selectionEnd) {
		return;
	}
	let selected = input1.value.slice(input1.selectionStart,input1.selectionEnd);
	input1.setRangeText(`${selected.slice(0,selected.length-1)}я гей!`)
}
button2.onclick=()=>{
	input1.setRangeText("ПРИВЕТ! ",input1.selectionStart,input1.selectionEnd,"end");
	input1.focus();
}