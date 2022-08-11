const { ipcRenderer }= require("electron");

function btnLogout() {
    authController.logout().then(ipcRenderer.invoke("logout"))
  }