const { app, BrowserWindow } = require('electron')
const path = require("path")

if (app.isPackaged) {
  const serve = require('electron-serve')
  serve({ directory: 'tweb/public/' });
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    }
  })

  if (app.isPackaged) {
    win.loadFile('tweb/public/index.html');
  } else {
    win.loadURL('http://localhost:8080/');
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
