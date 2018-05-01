const ms = require('ms')
const dimibob = require('dimibob')
const util = require('./util')

module.exports = (tray, menu) => {
  const { menuItem, updateTray } = util(tray, menu)

  async function updateMeal () {
    try {
      const bob = await dimibob()
      const dt = bob.date.split('-')

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

  updateTray()
  updateMeal() || setInterval(updateMeal, ms('2h'))
}
