var { ipcRenderer } = require('electron');
var testingdb = document.getElementById('testingdb')

var testContent = document.getElementById('test')

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



