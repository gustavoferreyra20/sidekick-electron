const { app, BrowserWindow, ipcMain, Menu, session } = require("electron");
const dotenv = require('dotenv');
const electronReload = require('electron-reload');

dotenv.config();
electronReload(__dirname);

let window;

async function mainWindow() {
  var cookie = await getCookie('userSession')
  window = new BrowserWindow({
    autoHideMenuBar: true,
    minHeight: 600,
    minWidth: 700,
    icon: "icon.ico",
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

ipcMain.handle('authUser', async () => {
  await mainWindow()
});

ipcMain.handle('logout', () => {
  session.defaultSession.clearStorageData({ storages: ['cookies'] })
    .then(() => {
      window.close()
    }, (error) => {
      console.error(error)
    })
});

function createCookie(args) {
  // Calculate the expiration date in milliseconds (7 days)
  const expirationDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  const cookie = {
    url:  'https://sidekick-server-nine.vercel.app/',
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
  return new Promise((resolve) => {
    session.defaultSession.cookies.get({ name: cookieName })
      .then((cookies) => {
        resolve(cookies)
      }).catch((error) => {
        console.log(error)
      })
  })

}
app.whenReady().then(mainWindow);