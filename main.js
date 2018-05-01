const ms = require('ms')
const dimibob = require('dimibob')
const package = require('./package.json')

const path = require('path')
const { app, shell, Tray, Menu, BrowserWindow } = require('electron')

let tray = null
let menu = null

app.on('ready', function () {
  tray = new Tray(path.join(__dirname, 'images', 'dimigo.png'))
  menu = [
    { id: 'date', enabled: false },
    { id: 'breakfast' },
    { id: 'lunch' },
    { id: 'dinner' },
    { id: 'snack' },

    { type: 'separator' },
    { role: 'about', click: () => shell.openExternal(package.repository) },
    { role: 'quit', click: () => app.quit() }
  ]

  updateTray()
})

const menuItem = id => menu.find(item => item.id === id)
const updateTray = () => tray.setContextMenu(Menu.buildFromTemplate(menu))

async function updateMeal () {
  try {
    const bob = await dimibob()
    const dt = bob.date.split('-')
    menuItem('date').label = `${dt[0]}년 ${dt[1]}월 ${dt[2]}일의 급식`
    menuItem('breakfast').label = `조식: ${bob.breakfast}`
    menuItem('lunch').label = `중식: ${bob.lunch}`
    menuItem('dinner').label = `석식: ${bob.dinner}`
    menuItem('snack').label = `간식: ${bob.snack}`
  } catch (err) {
    console.error(err)
  }

  updateTray()
}

updateMeal()
setInterval(updateMeal, ms('2h'))
