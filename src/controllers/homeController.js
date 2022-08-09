var els = document.getElementsByClassName('score');

for (var i = 0; i < els.length; i++) {
  var cell = els[i];
  if (cell.textContent <= 20 ) {
    cell.classList.add('red')
  } else if(cell.textContent <= 60) {
    cell.classList.add('orange');
  } else if(cell.textContent <= 100) {
    cell.classList.add('green');
}
}


