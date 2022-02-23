const {app, BrowserWindow} = require('electron');

const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'PRODUCTION'){
    require('electron-reload')(__dirname, {

    })
}

let mainWindow;

app.on('ready', () => {
    mainwindow = new BrowserWindow({
        autoHideMenuBar: true
    })
    mainwindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

});
