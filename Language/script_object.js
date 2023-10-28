/*let user = {
  name: "Василий Иванович",
  age: 35
};
let json = JSON.stringify(user,null,"--");
alert(json);
let newUser = JSON.parse(json);
alert(newUser.age);*/
let room = {
  number: 23
};

let meetup = {
  title: "Совещание",
  occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
  place: room
};

// цикличные ссылки
room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
	return ((key == "occupiedBy" && !Array.isArray(value)) || key == "self") ? undefined : value;}));