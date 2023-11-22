let str="ДИИММММОООООННННН!!!! ТУРУТУРУ-ТУ ТУТУ ТУТУ ТУ ТУРУТУ ТУТУ ТУ";
function crypto(opentext,key){
	let i=0;
	let cryptotext =new Uint8Array(opentext.length);
	opentext.forEach((item)=>{
		cryptotext[i] = item^key[i%key.length];
		i++;
	});
	return cryptotext;
};

function convert(){
	result.value="";
	if (!(text.value.length || keys.value.length)) {alert("Какое-то поле пустое!");return;}
	let encoder = new TextEncoder();
	let decoder = new TextDecoder();
	let shifr = crypto(new Uint8Array(text_bin.value.split(" ").map(item=>parseInt(item,16))),
		new Uint8Array(keys_bin.value.split(" ").map(item=>parseInt(item,16))));
	result.value = decoder.decode(shifr);
	result_bin.value="";
	shifr.forEach(item=>{result_bin.value+=item.toString(16)+" ";});
	result_bin.value = result_bin.value.substr(0,result_bin.value.length-1);
	//result.dispatchEvent(new Event("change"));
}
function text_in_bin(event,repeater,cir){
	if (event.currentTarget.value.length == 0) {
		repeater.value="";
		cir.classList.add("active");
		line.style.height = "0px";
		if (cir == circle1) {circle2.classList.add("active");circle3.classList.add("active");}
		if (cir == circle2) {circle3.classList.add("active");}
		return;
	}
	if (cir.classList.contains("active") && (cir == circle1 || !circle1.classList.contains("active"))) {
		cir.classList.remove("active");
		if (cir.innerHTML == "25%") {
			if (keys.value.length != 0) {
				line.style.height = "1000px";
				circle3.classList.remove("active");
				circle2.classList.remove("active");
			}
			else {
				line.style.height = "400px";
			}
		}
		else {
			line.style.height = "1000px";
			circle3.classList.remove("active");
		}
	}
	repeater.value="";
	let encoder = new TextEncoder();
	encoder.encode(event.currentTarget.value).forEach(item=>{repeater.value+=item.toString(16)+" ";});
	repeater.value = repeater.value.substr(0,repeater.value.length-1);
}
function bin_in_text(event,repeater){
	repeater.value="";
	let decoder = new TextDecoder();
	let arr = event.currentTarget.value.split(" ");
	arr.pop();
    arr = arr.map(item=>parseInt(item,16));
	let uint8Array = new Uint8Array(arr);
	repeater.value = decoder.decode(uint8Array);
}
/*let bin = encoder.encode(str);
let key1 = encoder.encode("ДИМОН ТЕХНИК");
bin.forEach((item)=>{p1.innerHTML+=item.toString(16) + " ,";});
let shifr = crypto(bin,key1);
shifr.forEach((item)=>{p2.innerHTML+=item.toString(16) + " ,";});

let newopen = crypto(shifr,key1);
let uint8Array = new Uint8Array(shifr);
let str2 = decoder.decode(uint8Array);
p3.innerHTML = str2;
let uint8Array2 = new Uint8Array(newopen);
p4.innerHTML = decoder.decode(uint8Array2);*/
function showText(event) {
	let fullcontent = event.currentTarget.closest('div.steps div.content');
	if (!fullcontent.querySelector('div.steps div.content div.contentFile .input-file').hidden) showFile(event);
	let content = fullcontent.querySelector('div.contentText');
	let header = fullcontent.querySelector('div.steps div.content div.contentText div.contentHeader');
	let content1 = fullcontent.querySelector('div.Areatext');
	let content2 = fullcontent.querySelector('div.Areabin');
	content1.hidden = !content1.hidden;
	content2.hidden = !content2.hidden;
	if (content1.hidden) {
		content.style.width = "8%";
		header.style.width = "100%";
	}
	else{
		content.style.width = "90%";
		header.style.width = "8%";
	}
}
function showFile(event){
	let fullcontent = event.currentTarget.closest('div.steps div.content');
	if (!fullcontent.querySelector('div.Areatext').hidden) showText(event);
	let content = fullcontent.querySelector('div.contentFile');
	let header = fullcontent.querySelector('div.steps div.content div.contentFile div.contentHeader');
	let input = fullcontent.querySelector('div.steps div.content div.contentFile .input-file');
	input.hidden = !input.hidden;
	if (input.hidden) {
		content.style.width = "8%";
		header.style.width="100%";
		input.style.display = "none";
	}
	else{
		content.style.width = "50%";
		header.style.width = "16%";
		input.style.display = "inline-block";
	}
}