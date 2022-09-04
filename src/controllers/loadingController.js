const userController = require('../../controllers/userController');
const { ipcRenderer }= require("electron");

window.onload = function() { 
    ipcRenderer.on('cookie', (event, cookie) => {

      if(cookie.length > 0){
        userController.isAuthenticated(cookie)
      }else{
        ipcRenderer.invoke("noCookie")
      }
      
    })
    }
    