const { Menu } = require('electron')

module.exports = (tray, menu) => ({
  menuItem: id => menu.find(item => item.id === id),
  updateTray: () => tray.setContextMenu(Menu.buildFromTemplate(menu))
})
