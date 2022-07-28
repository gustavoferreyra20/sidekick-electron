function btnLogout() {
    authController.logout().then(ipcRenderer.invoke("logout"))
  }