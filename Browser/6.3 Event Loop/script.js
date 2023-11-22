let i=0;
let timerid = null;
function count() {
	do {
		i++;
	}while (i%1e6 != 0)

	if (i < 1e8){
		main.append(document.createElement('div'));
		timerid = setTimeout(count);
		/* остановить с помощью микрозадачи Promise.resolve().then(()=>clearInterval(timerid));*/
	}
	else {
		main.append(document.createElement('div'));
	} 
}
