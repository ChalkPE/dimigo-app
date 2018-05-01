const { app } = require('electron')

app.on('ready', function () {
  const tray = require('./src/tray')
  const menu = require('./src/menu')
  const worker = require('./src/worker')

  worker(tray, menu)
  if (app.dock) app.dock.hide()
})

app.on('window-all-closed', () => void 0)
