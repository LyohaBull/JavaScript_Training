/*class Clock {
    constructor({template}){
      this.template = template;

    } 
      render() {
      let date = new Date();
  
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
  
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;

      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
  
      let output = this.template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
  
      console.log(output);
    }
  
    stop() {
      clearInterval(this.timer);
    }
  
    start() {
      this.render();
      this.timer = setInterval(()=>this.render(), 1000);
    }
  
  }
  
class ExtendedClock extends Clock {
	constructor({template, precision}){
		super({template});
		this.precision = precision;
	}
	
	start() {
	   this.render();
	   this.timer = setInterval(()=>this.render(), this.precision);
	}
}
  let clock = new ExtendedClock({
    template: 'h:m:s',
	precision: 2000
  });
  clock.start();

let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
   // (или мы можем использовать Object.create для задания прототипа)

  sayHi() {
    // вызываем метод родителя
    super.say(`Привет, ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Пока, ${this.name}`); // (*)
  }
};
Object.setPrototypeOf(sayHiMixin,sayMixin);
class User {
  constructor(name) {
    this.name = name;
  }
}

// копируем методы
Object.assign(User.prototype, sayHiMixin);

// теперь User может сказать Привет
new User("Вася").sayHi(); // Привет, Вася!

class FormatError extends SyntaxError {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
}
let err = new FormatError("ошибка форматирования");

alert( err.message ); // ошибка форматирования
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (потому что наследует от SyntaxError)
*/