const { app, BrowserWindow, ipcMain, Menu } = require("electron");
require('dotenv').config();
require('electron-reload')(__dirname);

let window;

function createWindow(obj) {

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
      contextIsolation: false,
    },
   })
  
   const mainMenu = Menu.buildFromTemplate(templateMenu);
   Menu.setApplicationMenu(mainMenu);
   winlogin.loadFile('views/section/login.html')
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

  ipcMain.handle('login', (event, obj) => {
    createWindow(obj)
    winlogin.close()
  });


app.whenReady().then(loginWindow);