let newWin=null;
function minPop(){
	let params ="width=600,height=600,left=100,top=100";
	newWin=window.open("/","test",params);
//	newWin.onload = function(){
		let html = `<div style='font-size: 30px;'>Добро пожаловать!</div><button onclick='window.close();'>Зактрыть окно!</button>
		<button onclick='window.moveBy(100,100);'>Переместить окно!</button>`;
		newWin.document.body.insertAdjacentHTML("afterbegin",html);
//}
}