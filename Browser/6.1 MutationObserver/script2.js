function create() {
	for (let i=0;i<5;i++){
		let div = document.createElement("div");
		if (i % 2 == 0) {
			div.classList.add("bad");
		}
		else {div.classList.add("true")}
		document.body.append(div)
	}
	
}