let th = table.querySelector(".nw");
table.onmouseover = th.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
  text.value += "mouseover " + target.tagName + "\n";
  text.scrollTop = text.scrollHeight;
};

table.onmouseout = th.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
  text.value += "mouseout " + target.tagName + "\n";
  text.scrollTop = text.scrollHeight;
};