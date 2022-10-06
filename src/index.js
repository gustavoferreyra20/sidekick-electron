const { app, BrowserWindow, ipcMain, Menu, session } = require("electron");
require('dotenv').config();
require('electron-reload')(__dirname);

let window;

async function mainWindow() {
  var userSession = await getCookie('userSession')
    window = new BrowserWindow({
      //autoHideMenuBar: true,
      minHeight: 500,
      minWidth: 700,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    window.webContents.openDevTools()

    window.webContents.on('did-finish-load', () => {
      window.webContents.send('userSession-data', userSession)
    })
    
    Menu.setApplicationMenu(mainMenu);
    window.loadFile("views/index.html");

  }
  
  function loginWindow () {
    winlogin = new BrowserWindow({
     /*width: 400,
     height: 630,
     resizable: false,*/
     webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
   })

   const mainMenu = Menu.buildFromTemplate(templateMenu);
   Menu.setApplicationMenu(mainMenu);
   winlogin.loadFile('views/section/login.html')

  }

  async function loadingWindow () {
    var userSession = await getCookie('userSession')
    winload = new BrowserWindow({
/*      width: 400,
     height: 630,
     resizable: false, */
     webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
   })

   const mainMenu = Menu.buildFromTemplate(templateMenu);
   Menu.setApplicationMenu(mainMenu);
   winload.loadFile('views/section/loading.html')

   winload.webContents.on('did-finish-load', () => {
    winload.webContents.send('userSession', userSession)
  })

  }
  
  const templateMenu = [
    {
        label: 'Devtools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    }]

  ipcMain.handle('login', async (event, args) => {
    createCookie(args)
    await mainWindow()
    winlogin.close()
  });

  ipcMain.handle('noCookie', (event, args) => {
    loginWindow()
    winload.close()
  });

  ipcMain.handle('authUser', async (event, args) => { 
    await mainWindow()
    winload.close()
  });

  ipcMain.handle('logout', (event, args) => {  
    session.defaultSession.cookies.remove('http://localhost/', 'jwt')
    .then(() => {
      loginWindow()
      window.close()
    }, (error) => {
      console.error(error)
    })
  });

  function createCookie(args){
    const cookie = { 
      url: 'http://localhost/',
      name: 'userSession',
      value: JSON.stringify(args),
      expirationDate: 99999999999999
    }
     
  session.defaultSession.cookies.set(cookie)
    .then(() => {
      // success
    }, (error) => {
      console.error(error)
    })
  }

  function getCookie(cookieName){
    return new Promise((resolve, reject) => {
      session.defaultSession.cookies.get({name:  cookieName})
    .then((cookies) => {
      resolve( cookies)
    }).catch((error) => {
      console.log(error)
    })
    })
    
  }
app.whenReady().then(loadingWindow);