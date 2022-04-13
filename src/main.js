const { BrowserWindow, ipcMain, Menu, Notification } = require("electron");
const { getConnection } = require("./database");

let window;

function createWindow() {

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
     resizable: false*/
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

  module.exports = {
    createWindow,
    loginWindow
  };

  ipcMain.handle('login', (event, obj) => {
    validatelogin(obj)
  });

  const validatelogin = async (obj) => {
    try {
      const conn = await getConnection();
      const { email, password } = obj 
      const sql = "SELECT * FROM usuario WHERE email=? AND password=?"
      await conn.query(sql, [email, password], (error, results, fields) => {
        if(error){ console.log(error);}
    
        if(results.length > 0){
           createWindow ()
           window.show()
           winlogin.close()
         }else{
           new Notification({
             title:"login",
             body: 'email o password equivocado'
           }).show()
         }
        
      });
    } catch (error) {
      console.log(error);
    }
  };
   
