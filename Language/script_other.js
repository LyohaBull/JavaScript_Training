/*let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
      get(target,prop,receiver) {
		  if (prop in target) {
			  return Reflect.get(...arguments)
		  }
		  else {
			  throw new ReferenceError("Ошибка: такого свойства не существует");
		  }
	  }
  });
}

user = wrap(user);

alert(user.name); // John
alert(user.age); // Ошибка: такого свойства не существует

let array = [1, 2, 3];

array = new Proxy(array, {
  get(target,prop,receiver){
	  if (prop < 0) {
		  return Reflect.get(target,target.length-(-(+prop)),receiver);
	  }
	   else {
		   return Reflect.get(...arguments);
	   }
  }	   
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2



let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Создадим хранилище обработчиков
  target[handlers] = [];

  // положим туда функции-обработчики для вызовов в будущем
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Создадим прокси для реакции на изменения
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // перенаправим операцию к оригинальному объекту
      if (success) { // если не произошло ошибки при записи свойства
        // вызовем обработчики
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";

let animals = ["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"];

let collater = Intl.Collator("ru",{
	usage: "sort",
	sensitivity: "accent"
});
animals.sort(collater.compare);
alert(animals);

alert( animals ); // АИСТ,ёж,енот,ехидна,тигр,ЯК
*/