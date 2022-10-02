function btnLogout() {
    userController.logout(userToken).then(ipcRenderer.invoke("logout"))
  }