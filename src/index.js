const { app, BrowserWindow, ipcMain, Menu, session } = require("electron");
const axios = require("axios");

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
    window.loadFile("index.html");

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
    var userSession = await getCookie('userSession')
    window.webContents.send('userSession-data', userSession)
  });

  ipcMain.handle('authUser', async (event, args) => { 
    await mainWindow()
  });

  ipcMain.handle('logout', (event, args) => {  
    session.defaultSession.clearStorageData({storages: ['cookies']})
    .then((res) => {
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
app.whenReady().then(mainWindow);