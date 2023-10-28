/*function sumTo1(n){
	let result =0;
	for (let i=1;i<=n;i++) result +=i;
	return result;
}
function sumTo2(n) {
	return (n == 1) ? 1 : n+sumTo2(n-1);}
function sumTo3(n) {
	return (n+1)/2 * n;
}
alert(sumTo1(10));
alert(sumTo2(10));
alert(sumTo3(10));

function factorial(n) {
	return (n == 1) ? 1 : n*factorial(n-1);}

alert(factorial(5));
let fib = function(n){
	return (n == 1) ? 1 : (n == 2 ) ? 1 : fib(n-1)+fib(n-2);
};
function fib_fast(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}
alert(fib_fast(77));

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
function printList(list){
	a = list;
	while (a.next != null) {alert(a.value); a=a.next;}
	alert(a.value);
}
function printList1(list){
	if (list.next != null) { alert(list.value);  printList1(list.next);}
	 else alert(list.value);
}
function printListInt(list){
let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}
function printListInt1(list){

  if (list.next) {
    printListInt1(list.next);
  }

  alert(list.value);
}
printListInt(list);
printListInt1(list);


function sum(a){
	return function (b) {return a+b;};
};
alert(sum(1)(2));
alert( sum(5)(-1) ); 

let arr = [1, 2, 3, 4, 5, 6, 7];
let index = -1;
function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}
function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}
alert( arr.filter(inBetween(3,6)));
alert( arr.filter(inArray([1, 2, 10])) );

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
let byField = function(str){
	return (typeof(users[0][str]) == typeof('string')) ? 
		function(a,b) { return a[str].localeCompare(b[str]);} :
	     function(a,b) { return a[str]-b[str];} ;
};
users.sort(byField('surname'));
alert(users[0].name);


function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
	let j=i;
    let shooter = function() { // функция shooter
      alert(j); // должна выводить порядковый номер
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}
let army = makeArmy();
army[0](); // у 0-го стрелка будет номер 10
army[5](); // и у 5-го стрелка тоже будет номер 10



  function makeCounter() {
    let count = 0;
    function counter() {
       return count++;
    };
    counter.set = function(a){
       count = a;
       return count;
    };
     counter.decrease = function(){
       return count--;
    };


  return counter;
  }
  
  let counter = makeCounter();
  
  alert( counter() ); // 0
  alert( counter() ); // 1
  
  counter.set(10); // установить новое значение счётчика
  
  alert( counter() ); // 10
  
  counter.decrease(); // уменьшить значение счётчика на 1
  
  alert( counter() ); // 10 (вместо 11)

*/
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15