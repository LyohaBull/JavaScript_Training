/*function delay(ms) {
  return new Promise(function(resolve,reject){
	  setTimeout(()=>resolve(),ms);
  });
}

delay(3000).then(() => alert('выполнилось через 3 секунды'));


function go() {
  showCircle(250, 250, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Здарова, отец!");
});
  }

function showCircle(cx, cy, radius) {
  return new Promise(function(resolve,reject){
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    setTimeout(() => {
      div.style.width = radius * 2 + 'px';
      div.style.height = radius * 2 + 'px';

      div.addEventListener('transitionend', function handler() {
        div.removeEventListener('transitionend', handler);
        resolve(div);
      });
    }, 0);
  });
};


async function loadJson(url) {
  let response = await fetch(url);
      if (response.status == 200) {
         let data = await response.json();
		  return data;
      } 
       throw new Error(response.status);	
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // Error: 404
 */
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Введите логин?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // ошибок не было, выходим из цикла
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // после alert начнётся новая итерация цикла
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
      } else {
        // неизвестная ошибка, пробрасываем её
        throw err;
      }
    }
  }


  alert(`Полное имя: ${user.name}.`);
  return user;
}

demoGithubUser();