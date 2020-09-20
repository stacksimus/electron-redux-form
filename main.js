const { app, BrowserWindow, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');

let mainWindow;

let currentAction = {};
let isCapturing = true;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            preload: __dirname + '/preload.js'
        }
    })

    //mainWindow.loadFile('index.html');
    mainWindow.loadURL('http://localhost:3000');
});

ipcMain.on('input:change', (event, name, value) => {
    if (isCapturing) {
        currentAction.name = name;
        currentAction.value = value;
        currentAction.element = 'input';
    }
})

ipcMain.on('input:blur', (event) => {
    if (isCapturing && Object.keys(currentAction).length > 0) {
        mainWindow.webContents.send('action:added', currentAction);
        currentAction = {};
    }
})

ipcMain.on('button:click', (event, value) => {
    mainWindow.webContents.send('action:added', {name: value, value: value, element: 'button'});
})

ipcMain.on('url:load', (event) => {
    currentAction = {};
});

ipcMain.on('capture:start', (event) => { isCapturing = true });

ipcMain.on('capture:stop', (event) => { isCapturing = false });
