function* pseudoRandom(n){
	let flag = true;
	let a=n;
	while (flag) {
		let b = a*16807%2147483647;
		yield b;
		a=b;
	}
}
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073		
	