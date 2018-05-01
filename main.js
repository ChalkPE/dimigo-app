const { app } = require('electron')

app.on('ready', function () {
  const tray = require('./src/tray')
  const menu = require('./src/menu')
  const worker = require('./src/worker')

  app.dock.hide()
  worker(tray, menu)
})

app.on('window-all-closed', () => void 0)
