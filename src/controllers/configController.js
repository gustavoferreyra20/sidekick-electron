function btnLogout() {
    userController.logout().then(ipcRenderer.invoke("logout"))
  }