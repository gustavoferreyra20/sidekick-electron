angular.module('myAppLoadingCtrl', []).controller('loadingCtrl', ['$scope', function($scope){
  window.onload = function() { 
    console.log("hello World")
    ipcRenderer.on('userSession', (event, userSession) => {
      // check if there is a cookie
      if(userSession.length > 0){
        userController.isAuthenticated(JSON.parse(userSession[0].value).token)
      }else{
        ipcRenderer.invoke("noCookie")
        }
          
      })
      }   
  }]);
    