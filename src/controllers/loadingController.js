const userController = require('../../controllers/userController');
const { ipcRenderer }= require("electron");

window.onload = function() { 
    ipcRenderer.on('userSession', (event, userSession) => {
      // check if there is a cookie
      if(userSession.length > 0){
        userController.isAuthenticated(JSON.parse(userSession[0].value).token)
      }else{
        ipcRenderer.invoke("noCookie")
      }
      
    })
    }
    