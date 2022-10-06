function btnLogout() {
    userController.logout(userSession.token).then(ipcRenderer.invoke("logout"))
  }