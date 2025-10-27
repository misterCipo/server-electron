const { app, BrowserWindow } = require('electron');
const WebSocket = require('ws');
const path = require('path');

let mainWindow;
const PORT = 2007;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('renderer/index.html');
  //mainWindow.webContents.openDevTools();
}


function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: PORT });

  wss.on('connection', (ws) => {
    console.log('Client connesso');

    ws.on('message', (message) => {
      console.log('Messaggio ricevuto:', message.toString());
      ws.send(`Ricevuto: ${message}`);
    });

    ws.on('close', () => console.log('Client disconnesso'));
  });

  console.log('Server WebSocket in ascolto');
}

app.whenReady().then(() => {
  createWindow();
  startWebSocketServer();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
