/*function f() {
alert("Hello!");
}
f.__proto__.__proto__.defer = function(ms) {
  setTimeout(this,ms);
};
f.defer(1000); // выведет "Hello!" через 1 секунду

let obj = {
   name: "John",

};
function f(a, b) {
  alert( a + b );
}
Function.prototype.defer = function(ms){
  
  let Mythis = this;
  return function(...args){
    alert(this.name); 
    setTimeout(()=>Mythis.apply(this,args),ms);
  };
  //setTimeout(()=>alert(thisArg.arguments[0]),ms);
}
//f.defer(1000)(1, 2); // выведет 3 через 1 секунду.


obj.kek = f.defer(1000);
obj.kek(3,5);
*/
let dictionary = Object.create(null, {
  toString: { // определяем свойство toString
    value() { // значение -- это функция
      return Object.keys(this).join();
    }
  }
});

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple и __proto__ выведены в цикле
for(let key in dictionary) {
  alert(key); // "apple", затем "__proto__"
}

// список свойств, разделённых запятой, выведен с помощью toString
alert(dictionary); // "apple,__proto__"

