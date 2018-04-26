const path = require('path')
const { app, Tray, Menu, BrowserWindow } = require('electron')

let tray = null
let window = null
let contextMenu = null

app.on('ready', function () {
  window = new BrowserWindow({ show: false })
  tray = new Tray(path.join(__dirname, 'images', 'dimigo.png'))

  contextMenu = Menu.buildFromTemplate([
    {
      label: '급식'
    },

    {
      label: '종료'
    }
  ])

  tray.setContextMenu(contextMenu)
})
