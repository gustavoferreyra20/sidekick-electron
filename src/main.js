const { BrowserWindow, Menu } = require("electron");

let window;

function hello() {
    console.log('Hello World from main')
}

function createWindow() {
    window = new BrowserWindow({
      //autoHideMenuBar: true,
      'minHeight': 500,
      'minWidth': 700,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
  
    });
    
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    window.loadFile("views/index.html");
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

  module.exports = {
    createWindow,
    hello
  };