// Modules
const {app, BrowserWindow} = require('electron');
const path = require('path');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    minWidth:1030,minHeight:600,
    backgroundColor: '2b2e3b',
    icon: path.join(__dirname, 'images/logo/logo_full.ico'),
    webPreferences: { nodeIntegration: true }
  })


  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('./index.html')
  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools(); 
  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready',()=>{
  createWindow()
} )


// app.on('before-quit',e=>{
//   e.preventDefault()
// })
// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
