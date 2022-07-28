const authController = require('../../controllers/authController');
const { ipcRenderer }= require("electron");

window.onload = function() { 
    ipcRenderer.on('cookie', (event, cookie) => {

      if(cookie.length > 0){
        authController.isAuthenticated(cookie)
      }else{
        ipcRenderer.invoke("noCookie")
      }
      
    })
    }
    