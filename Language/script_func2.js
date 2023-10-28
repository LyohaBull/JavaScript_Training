
/*let printNumbers = function f(from,to){
  let i=from-1;
  let timerId = setInterval(()=> {alert(++i);  
                                  if (i == to) clearInterval(timerId);},1000);
};

function printNumbers(from,to) {
  let i=from;
  let timerId = setTimeout(function print(){ if (i <= to) {alert(i++);timerId = setTimeout(print,1000);}},1000);
};
printNumbers(1,5);

function spy(func) {

  function wrapper(...args) {
    // мы используем ...args вместо arguments для хранения "реального" массива в wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
function work(a, b) {
  alert( a + b ); // произвольная функция или метод
}
work(1, 2); 
work = spy(work);
work(1, 2); // 3
work(4, 5); // 9
alert(work.calls);
for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}


function f(x) {
  alert(x);
}
function delay(func,ms){ 
  function wrapper(...args) {
    let test = this;
    let a = function(){func.apply(test,args);};
    setTimeout(a,ms);
	}
	return wrapper;
}		
// создаём обёртки
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // показывает "test" после 1000 мс
f1500("test"); // показывает "test" после 1500 мс

let f = debounce2(alert, 1000);
function debounce(f,ms){
	let end = Date.now()-ms*10;
    function wrapper(...args) {
		let time = Date.now();
		if ((time - end) > ms) {f.apply(this,args);end=time;}
	}
	return wrapper;	
}
function debounce2(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}
f(1); // выполняется немедленно
f(2); 
setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout( () => f(4), 1100); // выполняется
setTimeout( () => f(5), 1500); 


function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
function f(a) {
  console.log(a)
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3);
*/