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
	isHiddenText:false,
	isHiddenKey:false,
	isResultFile:false,
	update(){
		if (!this["25%"]) {progressBar(1);return;}
		if (!this["50%"]) {progressBar(2);return;}
		if (!this["75%"]) {progressBar(3);return;}
		if (!this["100%"]) {progressBar(4);return;}
		progressBar(5);
	},
	getState(){
		if (this.isFile) {
			if (span_text.innerHTML.length) this["25%"]=true;
				else this["25%"]=false;
		}
		 else {
			if (text.value.length  && !this.isHiddenText) this["25%"]=true;
				else this["25%"]=false;		 	
		}
		if (this.isFileKey) {
			if (span_keys.innerHTML.length) this["50%"]=true;
				else this["50%"]=false;
			}
		else {
			if (keys.value.length  && !this.isHiddenKey) this["50%"]=true;
				else this["50%"]=false;		 	
		}
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
		this.j=0;
		this.process=0;
	}
	start(){
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
			Result_hash.hidden = true;
			Result_file.hidden = false;
		}
		else {
			this.cryptotext.forEach(item=>{result_bin.value+=item.toString(16)+" ";});
			result_bin.value = result_bin.value.trim();
			result_bin.dispatchEvent(new Event("input"));
			Result_text.hidden = false;
			Result_hash.hidden = true;
			Result_file.hidden = true;
		}
	}
	hash_end(hash){
		result_hash.value = hash.toString();
		Result_text.hidden = true;
		Result_file.hidden = true;
		Result_hash.hidden = false;
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
	crypto_MD5(){
		let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let hash = CryptoJS.MD5(wordArray);
		this.hash_end(hash);
	}
	crypto_SHA256(){
		let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let hash = CryptoJS.SHA256(wordArray);
		this.hash_end(hash);
	}
	crypto_SHA512(){
		let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let hash = CryptoJS.SHA512(wordArray);
		this.hash_end(hash);
	}
	encrypt_init(method){
	let keyIV = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(this.key));
	let keyArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(0,4));
	let IVArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(4));
	this.blockSize = (this.opentext.length > 16000) ? Math.floor(this.opentext.length/16000)*16+16*(+Boolean(this.opentext.length%16000)) : 16;
	this.cryptotext = new Uint8Array((Math.floor(this.length/this.blockSize)*this.blockSize)+this.blockSize*(+Boolean(this.length%this.blockSize)));
	this.process = Number((100/(this.cryptotext.length/this.blockSize)).toFixed(2));
	this.processStep = this.process;
	switch(method){
		case "AES":{
			this.cipher = CryptoJS.algo.AES.createEncryptor(keyArray, { iv: IVArray,mode: CryptoJS.mode.OFB,
            	padding: CryptoJS.pad.AnsiX923 });
			this.encrypt();
			break;						
		}
		case "AES_D":{
			this.cipher = CryptoJS.algo.AES.createDecryptor(keyArray, { iv: IVArray,mode: CryptoJS.mode.OFB,
            	padding: CryptoJS.pad.AnsiX923 });
			this.decrypt(16);
			break;						
		}
		case "DES":{
			this.cipher = CryptoJS.algo.DES.createEncryptor(keyArray, { iv: IVArray});
			this.encrypt();
			break;						
		}
		case "DES_D":{
			this.cipher = CryptoJS.algo.DES.createDecryptor(keyArray, { iv: IVArray});
			this.decrypt(8);
			break;						
		}
		case "Triple DES":{
			this.cipher = CryptoJS.algo.TripleDES.createEncryptor(keyArray, { iv: IVArray});
			this.encrypt();	
			break;						
		}
		case "Triple DES_D":{
			this.cipher = CryptoJS.algo.TripleDES.createDecryptor(keyArray, { iv: IVArray});
			this.decrypt(8);
			break;						
		}
	}
}
	/*crypto_AES_OFB_init(){
	//	let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let keyIV = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(this.key));
		let keyArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(0,4));
		let IVArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(4));
		this.cipher = CryptoJS.algo.AES.createEncryptor(keyArray, { iv: IVArray,mode: CryptoJS.mode.OFB,
            padding: CryptoJS.pad.AnsiX923 });
		this.blockSize = (this.opentext.length > 16000) ? Math.floor(this.opentext.length/16000)*16+16*(+Boolean(this.opentext.length%16000)) : 16;
		this.cryptotext = new Uint8Array((Math.floor(this.length/this.blockSize)*this.blockSize)+this.blockSize*(+Boolean(this.length%this.blockSize)));
		this.process = Number((100/(this.cryptotext.length/this.blockSize)).toFixed(2));
		this.processStep = this.process;
		this.encrypt();
	}
	crypto_DES_init(){
	//	let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let keyIV = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(this.key));
		let keyArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(0,4));
		let IVArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(4));
		this.cipher = CryptoJS.algo.DES.createEncryptor(keyArray, { iv: IVArray});
		this.blockSize = (this.opentext.length > 16000) ? Math.floor(this.opentext.length/16000)*16+16*(+Boolean(this.opentext.length%16000)) : 16;
		this.cryptotext = new Uint8Array((Math.floor(this.length/this.blockSize)*this.blockSize)+this.blockSize*(+Boolean(this.length%this.blockSize)));
		this.process = Number((100/(this.cryptotext.length/this.blockSize)).toFixed(2));
		this.processStep = this.process;
		this.encrypt();
	}
	crypto_TripleDES_init(){
	//	let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let keyIV = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(this.key));
		let keyArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(0,4));
		let IVArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(4));
		this.cipher = CryptoJS.algo.TripleDES.createEncryptor(keyArray, { iv: IVArray});
		this.blockSize = (this.opentext.length > 16000) ? Math.floor(this.opentext.length/16000)*16+16*(+Boolean(this.opentext.length%16000)) : 16;
		this.cryptotext = new Uint8Array((Math.floor(this.length/this.blockSize)*this.blockSize)+this.blockSize*(+Boolean(this.length%this.blockSize)));
		this.process = Number((100/(this.cryptotext.length/this.blockSize)).toFixed(2));
		this.processStep = this.process;
		this.encrypt();
	}
	decrypt_DES_init(){
	//	let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let keyIV = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(this.key));
		let keyArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(0,4));
		let IVArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(4));
		this.cipher = CryptoJS.algo.DES.createDecryptor(keyArray, { iv: IVArray});
		this.blockSize = (this.opentext.length > 16000) ? Math.floor(this.opentext.length/16000)*16+16*(+Boolean(this.opentext.length%16000)) : 16;
		this.cryptotext = new Uint8Array((Math.floor(this.length/this.blockSize)*this.blockSize)+this.blockSize*(+Boolean(this.length%this.blockSize)));
		this.process = Number((100/(this.cryptotext.length/this.blockSize)).toFixed(2));
		this.processStep = this.process;
		this.decrypt(8);
	}
	decrypt_TripleDES_init(){
	//	let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let keyIV = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(this.key));
		let keyArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(0,4));
		let IVArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(4));
		this.cipher = CryptoJS.algo.TripleDES.createDecryptor(keyArray, { iv: IVArray});
		this.blockSize = (this.opentext.length > 16000) ? Math.floor(this.opentext.length/16000)*16+16*(+Boolean(this.opentext.length%16000)) : 16;
		this.cryptotext = new Uint8Array((Math.floor(this.length/this.blockSize)*this.blockSize)+this.blockSize*(+Boolean(this.length%this.blockSize)));
		this.process = Number((100/(this.cryptotext.length/this.blockSize)).toFixed(2));
		this.processStep = this.process;
		this.decrypt(8);
	}
	decrypt_AES_OFB_init(){
	//	let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let keyIV = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(this.key));
		let keyArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(0,4));
		let IVArray = CryptoJS.lib.WordArray.create(keyIV.words.slice(4));
		this.cipher = CryptoJS.algo.AES.createDecryptor(keyArray, { iv: IVArray,mode: CryptoJS.mode.OFB,
            padding: CryptoJS.pad.AnsiX923 });
		this.blockSize = (this.opentext.length > 16000) ? Math.floor(this.opentext.length/16000)*16+16*(+Boolean(this.opentext.length%16000)) : 16;
		this.cryptotext = new Uint8Array((Math.floor(this.length/this.blockSize)*this.blockSize)+this.blockSize*(+Boolean(this.length%this.blockSize)));
		this.process = Number((100/(this.cryptotext.length/this.blockSize)).toFixed(2));
		this.processStep = this.process;
		this.decrypt(16);
		this.sum=0;
	}*/
	encrypt(){
		let ciphertextPart = this.cipher.process(CryptoJS.lib.WordArray.create(this.opentext.subarray(this.i,this.i+this.blockSize)));
		this.i+=this.blockSize;
		let u1 = (new Uint8Array((new Int32Array(ciphertextPart.words.reverse())).buffer).reverse());
		if (u1.length) u1.forEach(item=>{this.cryptotext[this.j]=item;this.j++;});
		if (this.i < this.opentext.length) {
			Bar.innerHTML = this.process +"%";
			Bar.style.background = `linear-gradient(to right, #37B95E ${this.process}%, transparent ${this.process}%)`;
			this.process = Number((this.process + this.processStep).toFixed(2));
			setTimeout(()=>this.encrypt());
		}
		else {
			let final = this.cipher.finalize();
			let f = (new Uint8Array((new Int32Array(final.words.reverse())).buffer).reverse());
			f.forEach(item=>{this.cryptotext[this.j]=item;this.j++;});
			this.cryptotext = this.cryptotext.subarray(0,this.j);
			this.end();
		}
		
	}
	decrypt(block){
		let plaintextPart = this.cipher.process(CryptoJS.lib.WordArray.create(this.opentext.subarray(this.i,this.i+this.blockSize)));
		this.i+=this.blockSize;
		this.sum+=plaintextPart.sigBytes;
		let u1 = (new Uint8Array((new Int32Array(plaintextPart.words.reverse())).buffer).reverse());
		if (u1.length) u1.forEach(item=>{this.cryptotext[this.j]=item;this.j++;});
		if (this.i < this.opentext.length) {
			Bar.innerHTML = this.process +"%";
			Bar.style.background = `linear-gradient(to right, #37B95E ${this.process}%, transparent ${this.process}%)`;
			this.process = Number((this.process + this.processStep).toFixed(2));
			setTimeout(()=>this.decrypt(block));
		}
		else {
			let final = this.cipher.finalize();
			let f = (new Uint8Array((new Int32Array(final.words.reverse())).buffer).reverse());
			f.forEach(item=>{this.cryptotext[this.j]=item;this.j++;});
			this.cryptotext = this.cryptotext.subarray(0,this.j-block+final.sigBytes);	
			this.end();
		}
	}
	/*crypto_AES_OFB(){
		let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let keyArray = CryptoJS.MD5(CryptoJS.lib.WordArray.create(this.key));
		let encrypted = CryptoJS.AES.encrypt(wordArray,keyArray.toString(),{
			mode: CryptoJS.mode.OFB,
			padding: CryptoJS.pad.AnsiX923
		});
		this.cryptotext = text_in_binF(encrypted.toString());
		this.end();
	}
	decrypt_AES_OFB(){
		let p = bin_in_textF(this.opentext);
		let ciphertextParams = CryptoJS.lib.SerializableCipher._parse(p, CryptoJS.format.OpenSSL);
		let keyArray = CryptoJS.MD5(CryptoJS.lib.WordArray.create(this.key));
		let decrypted = CryptoJS.AES.decrypt(p,keyArray.toString(),{
			mode: CryptoJS.mode.OFB,
			padding: CryptoJS.pad.AnsiX923
		});

		this.cryptotext = (new Uint8Array((new Int32Array(decrypted.words.reverse())).buffer).reverse());
		this.cryptotext = this.cryptotext.subarray(0,decrypted.sigBytes);
		this.end();
	}*/
	/*crypto_DES(){
		let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let keyArray = CryptoJS.MD5(CryptoJS.lib.WordArray.create(this.key));
		let encrypted = CryptoJS.DES.encrypt(wordArray,keyArray.toString());
		this.cryptotext = text_in_binF(encrypted.toString());
		this.end();
	}
	decrypt_DES(){
		let p = bin_in_textF(this.opentext);
		let ciphertextParams = CryptoJS.lib.SerializableCipher._parse(p, CryptoJS.format.OpenSSL);
		let keyArray = CryptoJS.MD5(CryptoJS.lib.WordArray.create(this.key));
		let decrypted = CryptoJS.DES.decrypt(p,keyArray.toString());
		this.cryptotext = (new Uint8Array((new Int32Array(decrypted.words.reverse())).buffer).reverse());
		this.cryptotext = this.cryptotext.subarray(0,decrypted.sigBytes);
		this.end();
	}
	crypto_Triple_DES(){
		let wordArray = CryptoJS.lib.WordArray.create(this.opentext);
		let keyArray = CryptoJS.MD5(CryptoJS.lib.WordArray.create(this.key));
		let encrypted = CryptoJS.TripleDES.encrypt(wordArray,keyArray.toString());
		this.cryptotext = text_in_binF(encrypted.toString());
		this.end();
	}
	decrypt_Triple_DES(){
		let p = bin_in_textF(this.opentext);
		let ciphertextParams = CryptoJS.lib.SerializableCipher._parse(p, CryptoJS.format.OpenSSL);
		let keyArray = CryptoJS.MD5(CryptoJS.lib.WordArray.create(this.key));
		let decrypted = CryptoJS.TripleDES.decrypt(p,keyArray.toString());
		this.cryptotext = (new Uint8Array((new Int32Array(decrypted.words.reverse())).buffer).reverse());
		this.cryptotext = this.cryptotext.subarray(0,decrypted.sigBytes);
		this.end();
	}*/
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
	/*new Promise((resolve)=>{
		if (progressState.isFile) {
			let reader = new FileReader();
			reader.readAsArrayBuffer(input_file.files[0]);
			reader.onload = ()=>resolve(reader.result);
		}
		else {
			resolve(text_bin.value.split(" ").map(item=>parseInt(item,16)));
		}
	}).then(res=>{
		if (progressState.isFileKey) {
			return new Promise((resolve)=>{
				let reader = new FileReader();
				reader.readAsArrayBuffer(input_key.files[0]);
				reader.onload = ()=>resolve(res,reader.result);
			}).then((textR,keyR)=>{
				encryption = new Encryption(textR,keyR);
				//encryption.start();
				//encryption.crypto();
			})
		} else {
			encryption = new Encryption(res,keys_bin.value.split(" ").map(item=>parseInt(item,16)));
			//encryption.start();
			//encryption.crypto();
		}
	});*/

	new Promise((resolve)=>{
		if (progressState.isFile) {
			let reader = new FileReader();
			reader.readAsArrayBuffer(input_file.files[0]);
			reader.onload = ()=>resolve(reader.result);
		}
		else {
			resolve(text_bin.value.split(" ").map(item=>parseInt(item,16)));
		}
	}).then(res=>{	
			return new Promise((resolve)=>{
				if (progressState.isFileKey) {
					let reader = new FileReader();
					reader.readAsArrayBuffer(input_key.files[0]);
					reader.onload = ()=>resolve(res,reader.result);
				}
				else resolve(res,keys_bin.value.split(" ").map(item=>parseInt(item,16)));
			})
		
	}).then((textR,keyR)=>{
				encryption = new Encryption(textR,keyR);
				encryption.start();
				switch (algorithm.value) {
					case "MD5":{
						encryption.crypto_MD5();
						break;
					}
					case "SHA256":{
						encryption.crypto_SHA256();
						break;						
					}
					case "SHA512":{
						encryption.crypto_SHA512();
						break;						
					}  
					case "XOR":{
						encryption.crypto();
						break;	
					} 
					case "AES":{
						encryption.encrypt_init(algorithm.value);
						break;						
					}
					case "AES_D":{
						encryption.encrypt_init(algorithm.value);
						break;						
					}
					case "DES":{
						encryption.encrypt_init(algorithm.value);
						break;						
					}
					case "DES_D":{
						encryption.encrypt_init(algorithm.value);
						break;						
					}
					case "Triple DES":{
						encryption.encrypt_init(algorithm.value);
						break;						
					}
					case "Triple DES_D":{
						encryption.encrypt_init(algorithm.value);
						break;						
					}
			}});

	/*if (progressState.isFile) {
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
	} */
}
function text_in_binF(str) {
	let encoder = new TextEncoder();
	return encoder.encode(str);
}
function bin_in_textF(arr) {
	let decoder = new TextDecoder();
	return decoder.decode(arr);
}
function text_in_bin(event,repeater){
	repeater.value="";
	/*if (event.currentTarget.value.length == 0) {
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
	}*/
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
	progressState.getState();
	progressState.update();
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
		if (event.currentTarget.closest(".step1")) progressState.isHiddenText = true;
		else progressState.isHiddenKey = true;
	}
	else{
		content.style.width = "90%";
		header.style.width = "8%";
		if (event.currentTarget.closest(".step1")) {
			/*if (text.value.length == 0) progressState["25%"] = false;
			else progressState["25%"] = true;
			progressState.update();*/
			progressState.isHiddenText = false;
			progressState.isFile = false;
		}
		else {
			/*if (keys.value.length == 0) progressState["50%"] = false;
			else progressState["50%"] = true;
			progressState.update();*/
			progressState.isFileKey = false;
			progressState.isHiddenKey = false;

		}
	}
	progressState.getState();
	progressState.update();
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

		/*if (event.currentTarget.closest(".step1")) {
			progressState["25%"] = false;
			progressState.update();
		}
		else {
			progressState["50%"] = false;
			progressState.update();
		}*/
	}
	else{
		content.style.width = "50%";
		header.style.width = "16%";
		input.style.display = "inline-block";
		if (event.currentTarget.closest(".step1")) {
			/*if (span_text.innerHTML.length == 0) progressState["25%"] = false;
			else progressState["25%"] = true;
			progressState.update();*/
			progressState.isFile = true;
		}
		else {
			/*if (span_keys.innerHTML.length == 0) progressState["50%"] = false;
			else progressState["50%"] = true;
			progressState.update();*/
			progressState.isFileKey = true;
		}
	}
	progressState.getState();
	progressState.update();
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
	/*if (span == span_text) {
		progressState["25%"] = true;
		progressState.update();
		return;
	}
	else {
		progressState["50%"] = true;
		progressState.update();
		return;
	}*/
	progressState.getState();
	progressState.update();
	/*if (event.currentTarget.closest(".step1")) {
		if (span_keys.innerHTML.length == 0) {
			if (keys_bin.value == 0) progressBar(2);
		else progressBar(4);
		}
	}
	else */
}