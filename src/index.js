const {app, BrowserWindow, Menu} = require('electron');

const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'PRODUCTION'){
    require('electron-reload')(__dirname, {

    })
}

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        //autoHideMenuBar: true,
        'minHeight': 500,
        'minWidth': 700
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

});

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