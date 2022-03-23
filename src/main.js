const { BrowserWindow, ipcMain, Menu } = require("electron");
const { getConnection } = require("./database");

let window;

const createTest = async (test) => {
  try {
    const conn = await getConnection();
    await conn.query("INSERT INTO test SET ?", test);

  } catch (error) {
    console.log(error);
  }
};


function createWindow() {
  
    ipcMain.on('createTest-action', (event, arg) => {
      createTest(arg);
      //console.log(arg);
    });

    window = new BrowserWindow({
      //autoHideMenuBar: true,
      'minHeight': 500,
      'minWidth': 700,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
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
    createWindow
  };

