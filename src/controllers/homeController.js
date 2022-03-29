var { ipcRenderer } = require('electron');
var testingdb = document.getElementById('testingdb')

var testContent = document.getElementById('test')
/*
testingdb.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
    
        const test = {
          content: testContent.value
        };
    
        await ipcRenderer.send('createTest-action', test);;

      } catch (error) {
        console.log(error);
      }
})
*/
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


