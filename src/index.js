const { app, BrowserWindow, ipcMain, Menu, session } = require("electron");
const axios = require("axios");

require('dotenv').config();
require('electron-reload')(__dirname);

let window;

async function mainWindow() {
  var cookie = await getCookie('userSession')
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
    window.webContents.send('userSession-data', cookie)
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
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  }]

ipcMain.handle('login', async (event, args) => {
  await createCookie(args);
  window.webContents.send('userSession-data', args);
});

ipcMain.handle('authUser', async (event, args) => {
  await mainWindow()
});

ipcMain.handle('logout', (event, args) => {
  session.defaultSession.clearStorageData({ storages: ['cookies'] })
    .then((res) => {
      window.close()
    }, (error) => {
      console.error(error)
    })
});

function createCookie(args) {
  // Calculate the expiration date in milliseconds (7 days)
  const expirationDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  const cookie = {
    url: process.env.SERVER_COOKIE,
    name: 'userSession',
    value: JSON.stringify(args),
    expirationDate: expirationDate / 1000, // Convert to seconds
  }

  session.defaultSession.cookies.set(cookie)
    .then(() => {
      // success
    }, (error) => {
      console.error(error)
    })
}

function getCookie(cookieName) {
  return new Promise((resolve, reject) => {
    session.defaultSession.cookies.get({ name: cookieName })
      .then((cookies) => {
        resolve(cookies)
      }).catch((error) => {
        console.log(error)
      })
  })

}
app.whenReady().then(mainWindow);