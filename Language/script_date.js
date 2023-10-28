/*let date = new Date(Date.parse("2012-01-20T03:12:00.000Z"));
alert(date);

let date = new Date(2012, 0, 3);  // 3 января 2012 года
let getLocalDay = function(date){
	return (date.getDay() == 0) ? 7 : date.getDay();
};
alert( getLocalDay(date) );       // вторник, нужно показать 2

let date = new Date(2015, 0, 2);
let getDateAgo = function(date,a){
	let newdate = new Date(date.getTime());
	newdate.setTime(newdate.getTime()-a*1000*24*3600);
	return newdate;
};
alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)

function getLastDayOfMonth(year,month){
	let date = new Date(year,month);
	date.setMonth(date.getMonth()+1,date.getDate()-1);
	return date.getDate();
}
alert(getLastDayOfMonth(2012, 1));

function getSecondsToday(){
   let date = new Date();
   return date.getHours()*3600 + date.getMinutes()*60 +date.getSeconds();
   
}
alert(getSecondsToday());


function getSecondsToTommorow(){
   let date = new Date();
   return 3600*24 - (date.getHours()*3600 + date.getMinutes()*60 +date.getSeconds());
   
}
alert(getSecondsToTommorow());
*/
// Хардкорное решение в стиле ниндзя-кода
let formatDate = function(date){
  return (+Date.now()-+date < 1000) ? "прямо сейчас" : 
          (+Date.now()-+date < 60*1000) ? `${Math.round((Date.now()-+date)/1000)} сек. назад` : 
           (+Date.now()-+date < 60*60*1000) ? `${Math.round((Date.now()-+date)/(60*1000))} мин. назад` 
            : `${(date.getDate() < 10) ? ('0'+date.getDate()) : date.getDate()}.${(+(date.getMonth()+1) < 10) ? ('0'+ +(date.getMonth()+1)) : +(date.getMonth()+1)}.${(date.getFullYear())%100} ${date.getHours()}:${date.getMinutes()}`;
	
};
alert( formatDate(new Date(new Date - 1)) );
alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"
alert( formatDate(new Date(new Date - 5 * 60 * 1000)) );
alert( formatDate(new Date(new Date - 86400 * 1000)) );