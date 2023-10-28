let table = document.getElementById('bagua-table');
let editingTd;
table.onclick = function(event){
  let td = event.target.closest('.edit-controls,.edit-area,td'); // (1)
  if (!td) return; // (2)
  if (!table.contains(td)) return; // (3)
  if (td.classList.contains("edit-controls")){
    develop(event.target);
    return;
  }
  if (editingTd) return;
  makeTextArea(td);
}

function makeTextArea(td){
  editingTd = {
    elem: td,
    data: td.innerHTML
  };

  td.classList.add("edit-td");
  let textarea = document.createElement("textarea");
  textarea.value = td.innerHTML;
  textarea.classList.add("edit-area");
  textarea.style.width = td.offsetWidth + "px";
  textarea.style.height = td.offsetHeight + "px";
  td.innerHTML = '';
  td.appendChild(textarea);
  
  textarea.insertAdjacentHTML("afterend","<div class='edit-controls'><button>OK!</button><button>CANCEL!</button>")
  textarea.focus();
}

function develop(button) {
  if (button.innerHTML == "OK!"){
    let td = button.closest(".edit-td");
    let textarea = td.querySelector(".edit-area");
    td.innerHTML = textarea.value;
    textarea.remove();
    td.classList.remove("edit-td");
    editingTd = null;
  }
  else { 
    let td = button.closest(".edit-td");
    let textarea = td.querySelector(".edit-area");
    td.innerHTML = editingTd.data;
    textarea.remove();
    td.classList.remove("edit-td");
    editingTd = null;
  }
  
}
/* ваш код */