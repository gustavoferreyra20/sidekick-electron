const { app, BrowserWindow, ipcMain, Menu, session } = require("electron");
require('dotenv').config();
require('electron-reload')(__dirname);

let window;

function mainWindow(args) {

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

    creatCookie(args)

    session.defaultSession.cookies.get({name:  'jwt'})
    .then((cookies) => {
      console.log(cookies)
    }).catch((error) => {
      console.log(error)
    })
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
      partition: 'persist:MyAppSomethingUnique'
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

  ipcMain.handle('login', (event, args) => {
    
    mainWindow(args)
    winlogin.close()
  });

  function creatCookie(args){
    const cookie = { 
      url: 'http://localhost/',
      name: 'jwt',
      value: args,
      expirationDate: 99999999999999
    }
     
  session.defaultSession.cookies.set(cookie)
    .then(() => {
      // success
    }, (error) => {
      console.error(error)
    })
  }

app.whenReady().then(loginWindow);