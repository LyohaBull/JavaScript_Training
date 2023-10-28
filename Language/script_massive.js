/*let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 29 };

let arr = [ vasya, petya, masha ];
let getAverageAge = function(arr) {
   return arr.reduce( (accumulator,item) => accumulator + item.age,0)/arr.length; 
};
//alert( getAverageAge(arr) ); 

function unique1(arr) {
   uniquearr = [];
   arr.forEach((item) => (uniquearr.includes(item)) ? uniquearr : uniquearr = uniquearr.concat(item));
   return uniquearr;
}

let strings = ["кришна", "кришна", "харе", "харе",
  "харе", "харе", "кришна", "кришна", ":-O"
];

//alert( unique(strings) );

let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];
let groupByIdMy = function(arr){
  obj ={};
  arr.forEach((item) => obj[item["id"]] = item);
  return obj;
};
// Или
function groupById(array) {
  return array.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
  }, {})
}

let usersById = groupById(users);
alert(usersById["ann"]["name"]);
/*
// после вызова у нас должно получиться:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}

function unique(arr) {
  let set = new Set();
  arr.forEach((item) => set.add(item));
  return Array.from(set);
}
let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];
alert( unique(values) ); // Hare,Krishna,:-O

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
let aclean = function(arr){
	let set = new Set();
	let num = [];
	function sortw(str){
		let arrw = Array.from(str);
		arrw.sort();
		let newstr = arrw.reduce((sum, cur) => sum+cur,"");
		return newstr;
	}
	arr.forEach((item,index) => {let bufstr = sortw(arr[index].toLowerCase()); if (!set.has(bufstr)) num.push(index); set.add(bufstr);});
	//set.forEach((value) => alert(value));
	let newarr = [];
	num.forEach((item) => newarr.push(arr[item]));
	return newarr;
};
alert( aclean(arr) ); // "nap,teachers,ear" или "PAN,cheaters,era"
// их решение
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // разбиваем слово на буквы, сортируем и объединяем снова в строку
    let sorted = word.toLowerCase().split("").sort().join(""); // (*)
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );


let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
let sumSalaries = function(obj){
	let sum=0;
	for (let value of Object.values(obj)) sum += value;
	return sum;
};
alert( sumSalaries(salaries) ); // 650


let user = {
  name: 'John',
  age: 30
};
let count = function(obj){
  return Object.entries(obj).length;
};
alert( count(user) ); // 2

let user = { name: "John", years: 30 };

let {name,years: age,isAdmin = false} = user;
*/

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

let topSalary = function(obj){
	let top = null;
	let nametop = null;
	for (let [key,value] of Object.entries(obj))
		if (top < value) {top=value;nametop=key;}
	return nametop
};
alert(topSalary(salaries));