let str="ДИИММММОООООННННН!!!! ТУРУТУРУ-ТУ ТУТУ ТУТУ ТУ ТУРУТУ ТУТУ ТУ ТУРУТУРУ-ТУ ТУТУ ТУТУ ТУ ТУРУТУ ТУТУ Т";
text.value="";
text_bin.value="";
keys.value="";
keys_bin.value="";
let encryption;
function downloadAsFile(data) {
  let a = document.createElement("a");
  let file = new Blob([data]);
  a.href = URL.createObjectURL(file);
  a.download = filename.innerHTML;
  a.click();
}
let progressState = {
	"25%":false,
	"50%":false,
	"75%":true,
	"100%":true,
	isFile:false,
	isFileKey:false,
	isResultFile:false,
	update(){
		if (!this["25%"]) {progressBar(1);return;}
		if (!this["50%"]) {progressBar(2);return;}
		if (!this["75%"]) {progressBar(3);return;}
		if (!this["100%"]) {progressBar(4);return;}
		progressBar(5);
	},
	initial(){
		this["25%"]=false;
		this["50%"]=false;
		this["100%"]=false;
	}
};
class Encryption{
	constructor(opentext,key){
		this.opentext = new Uint8Array(opentext);
		this.key = new Uint8Array(key);
		this.length = this.opentext.length;
		this.step = (this.length >= 100) ? Math.round(this.length/100):this.length;
		this.cryptotext = new Uint8Array(this.length);
		this.i=0;
	}
	start(){
		alert("start!");
		Bar.innerHTML = "0%";
		Bar.style.background = `transparent`;
		progressState["100%"]=true;
		progressState.update();
		result_bin.value="";
	}
	end(){
		Bar.innerHTML = "100%";
		Bar.style.background = `#37B95E`;
		if (this.length > 1000 || progressState.isResultFile) {
			alert("Результат ввиде файла!");
			filename.innerHTML = prompt("Введите название файла","file");
			Result_text.hidden = true;
			Result_file.hidden = false;
		}
		else {
			this.cryptotext.forEach(item=>{result_bin.value+=item.toString(16)+" ";});
			result_bin.value = result_bin.value.trim();
			result_bin.dispatchEvent(new Event("input"));
			Result_text.hidden = false;
			Result_file.hidden = true;
		}
	}
	crypto(){
		let j=this.i;
		do {
			this.cryptotext[this.i] = this.opentext[this.i]^this.key[this.i%this.key.length];
			this.i++;
		}while (this.i<j+this.step)
		if (this.i < this.opentext.length) {
			Bar.innerHTML = +((100*j/this.length).toFixed(2)) +"%";
			Bar.style.background = `linear-gradient(to right, #37B95E ${+((100*j/this.length).toFixed(2))}%, transparent ${+((100*j/this.length).toFixed(2))}%)`;
			setTimeout(()=>this.crypto());
		}
		else this.end();
	}
}

/*function crypto(opentext,cryptotext,key,i,step){
	let j = i;
	do {
		cryptotext[j] = opentext[j]^key[j%key.length];
		j++;
	}while (j<i+step)
	if (i < opentext.length) {
		Bar.innerHTML = +((100*i/opentext.length).toFixed(2)) +"%";
		Bar.style.background = `linear-gradient(to right, #37B95E ${+((100*i/opentext.length).toFixed(2))}%, transparent ${+((100*i/opentext.length).toFixed(2))}%)`;
		setTimeout(()=>crypto(opentext,cryptotext,key,i+step,step));
	}
	else {
		Bar.innerHTML = "100%";
		Bar.style.background = `#37B95E`;
		let decoder = new TextDecoder();
		result.value = decoder.decode(cryptotext);
		result_bin.value="";
		cryptotext.forEach(item=>{result_bin.value+=item.toString(16)+" ";});
		result_bin.value = result_bin.value.substr(0,result_bin.value.length-1);
		Result_area.hidden = false;
	}


};*/

/*function convert(){
	progressState["100%"]=true;
	progressState.update();
	result.value="";
	if (!(text.value.length || keys.value.length)) {alert("Какое-то поле пустое!");return;}
	let length = (text_bin.value.split(" ").map(item=>parseInt(item,16))).length;
	let step = Math.round(length/100);
	let shifr = new Uint8Array(length);
	let opentext = new Uint8Array(text_bin.value.split(" ").map(item=>parseInt(item,16)));
	let key = new Uint8Array(keys_bin.value.split(" ").map(item=>parseInt(item,16)));
	if (length >= 100) {
		crypto(opentext,shifr,key,0,step);			
	}
	else {
		crypto(opentext,shifr,key,0,opentext.length);
		Bar.innerHTML = "100%";
		Bar.style.background = `#37B95E`;
		let decoder = new TextDecoder();
		result.value = decoder.decode(shifr);
		result_bin.value="";
		shifr.forEach(item=>{result_bin.value+=item.toString(16)+" ";});
		result_bin.value = result_bin.value.substr(0,result_bin.value.length-1);
		Result_area.hidden = false;
	}
}*/
function convert(){
	if (progressState.isFile) {
		let reader = new FileReader();
		reader.readAsArrayBuffer(input_file.files[0]);
		reader.onload = ()=>{
			alert("Чтение файла завершено!");
			if (progressState.isFileKey) {
				let reader2 = new FileReader();
				reader2.readAsArrayBuffer(input_key.files[0]);
				reader2.onload = ()=>{
					alert("Чтение файла-ключа завершено!");
					encryption = new Encryption(reader.result,reader2.result);
					encryption.start();
					encryption.crypto();
				}
			} else {
				encryption = new Encryption(reader.result,keys_bin.value.split(" ").map(item=>parseInt(item,16)));
				encryption.start();
				encryption.crypto();
			}
		}
	} else {
		if (progressState.isFileKey) {
			let reader = new FileReader();
			reader.readAsArrayBuffer(input_key.files[0]);
			reader.onload = ()=>{
				alert("Чтение файла-ключа завершено!");
				encryption = new Encryption(text_bin.value.split(" ").map(item=>parseInt(item,16)),reader.result);
				encryption.start();
				encryption.crypto();
			}
		}
		 else {
			encryption = new Encryption(text_bin.value.split(" ").map(item=>parseInt(item,16)),keys_bin.value.split(" ").map(item=>parseInt(item,16)));
			encryption.start();
			encryption.crypto();
		}
	} 
}
function text_in_bin(event,repeater){
	repeater.value="";
	if (event.currentTarget.value.length == 0) {
		if (event.currentTarget == text) {
			progressState["25%"] = false;
			progressState.update();
			return;
		}
		else {

			progressState["50%"] = false;
			progressState.update();
			return;
		}
	}
	if (event.currentTarget == text) {
		progressState["25%"] = true;
		progressState.update();
	}
	else {
		progressState["50%"] = true;
		progressState.update();		
	}
	/*if (event.currentTarget.value.length == 0) {
		repeater.value = "";
		if (event.currentTarget == text) {
			progressBar(1); 
			return;
		}
		else if (text.value.length == 0) {
			progressBar(1); 
			return;
			}
		progressBar(2);
		return;
	}
	if (event.currentTarget == text) progressBar(2);
	if (event.currentTarget == text && (keys.value.length != 0 || span_keys.innerHTML.length != 0)) progressBar(4);
	if (event.currentTarget == keys && (text.value.length != 0 || span_text.innerHTML.length != 0)) progressBar(4);*/
	let encoder = new TextEncoder();
	encoder.encode(event.currentTarget.value).forEach(item=>{repeater.value+=item.toString(16)+" ";});
	repeater.value = repeater.value.trim();
	/*repeater.value = repeater.value.substr(0,repeater.value.length-1);*/
}
function bin_in_text(event,repeater){
	repeater.value="";
	let decoder = new TextDecoder();
	let arr=[];
	if (event.currentTarget.value.includes(" ")) arr = event.currentTarget.value.split(" ");
		else arr.push(event.currentTarget.value);
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
		if (event.currentTarget.closest(".step1")) {
			progressState["25%"] = false;
			progressState.update();
		}
		else {
			progressState["50%"] = false;
			progressState.update();
		}
	}
	else{
		content.style.width = "90%";
		header.style.width = "8%";
		if (event.currentTarget.closest(".step1")) {
			if (text.value.length == 0) progressState["25%"] = false;
			else progressState["25%"] = true;
			progressState.update();
			progressState.isFile = false;
		}
		else {
			if (keys.value.length == 0) progressState["50%"] = false;
			else progressState["50%"] = true;
			progressState.update();
			progressState.isFileKey = false;
		}
	}
}
function showFile(event){
	let fullcontent = event.currentTarget.closest('div.steps div.content');
	let span = fullcontent.querySelector(".input-file .input-file-text");
	if (!fullcontent.querySelector('div.Areatext').hidden) showText(event);
	let content = fullcontent.querySelector('div.contentFile');
	let header = fullcontent.querySelector('div.steps div.content div.contentFile div.contentHeader');
	let input = fullcontent.querySelector('div.steps div.content div.contentFile .input-file');
	input.hidden = !input.hidden;
	if (input.hidden) {
		content.style.width = "8%";
		header.style.width="100%";
		input.style.display = "none";
		if (event.currentTarget.closest(".step1")) {
			progressState["25%"] = false;
			progressState.update();
		}
		else {
			progressState["50%"] = false;
			progressState.update();
		}
	}
	else{
		content.style.width = "50%";
		header.style.width = "16%";
		input.style.display = "inline-block";
		if (event.currentTarget.closest(".step1")) {
			if (span_text.innerHTML.length == 0) progressState["25%"] = false;
			else progressState["25%"] = true;
			progressState.update();
			progressState.isFile = true;
		}
		else {
			if (span_keys.innerHTML.length == 0) progressState["50%"] = false;
			else progressState["50%"] = true;
			progressState.update();
			progressState.isFileKey = true;
		}
	}
}

function progressBar(step) {
	switch(step){
	case 1:{
			over.style.height="0px";
			break;
		}
	case 2:{
			over.style.height="190px";
			break;
		}
	case 3:{
			over.style.height="570px";
			break;
		}
	case 4:{
			over.style.height="906px";
			break;
		}
	case 5:{
			over.style.height="1130px";
			break;
		}
	}
}

function progressFile(event){
	let span = event.currentTarget.closest(".input-file").querySelector(".input-file-text");
	span.innerHTML=event.currentTarget.files[0].name;
	if (span == span_text) {
		progressState["25%"] = true;
		progressState.update();
		return;
	}
	else {
		progressState["50%"] = true;
		progressState.update();
		return;
	}

	/*if (event.currentTarget.closest(".step1")) {
		if (span_keys.innerHTML.length == 0) {
			if (keys_bin.value == 0) progressBar(2);
		else progressBar(4);
		}
	}
	else */
}