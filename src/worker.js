const ms = require('ms')
const path = require('path')
const dimibob = require('dimibob')
const { app, BrowserWindow } = require('electron')

const util = require('./util')
const store = require('./store')

let authWindow = null

module.exports = (tray, menu) => {
  const { menuItem, updateTray } = util(tray, menu)

  async function updateMeal () {
    try {
      const bob = await dimibob()
      const dt = bob.date.split('-').map(Number)

      menuItem('date').label = `${dt[0]}년 ${dt[1]}월 ${dt[2]}일의 급식`
      menuItem('breakfast').label = `조식: ${bob.breakfast}`
      menuItem('lunch').label = `중식: ${bob.lunch}`
      menuItem('dinner').label = `석식: ${bob.dinner}`
      menuItem('snack').label = `간식: ${bob.snack}`

      updateTray()
    } catch (err) {
      console.error(err)
    }
  }

  function signIn () {
    if (authWindow) {
      authWindow.destroy()
      authWindow = null
    }

    authWindow = new BrowserWindow({ width: 200, height: 500 })
    authWindow.on('closed', () => (authWindow = null))
    authWindow.loadURL('file://' + path.join(__dirname, '..', 'app', 'auth.html'))
  }

  const lifeMenu = menuItem('life')

  lifeMenu.label = (lifeMenu.enabled = !store.has('token'))
    ? '디미고 계정으로 로그인'
    : store.get('me').user.name + '님 안녕하세요!'


  lifeMenu.click = function () {
    if (!store.has('token')) signIn()
    else console.log(store.get('me'))
  }

  updateTray()
  updateMeal() || setInterval(updateMeal, ms('2h'))
}
