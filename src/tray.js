const path = require('path')
const { platform } = require('os')
const { Tray } = require('electron')

const mac = platform() === 'darwin'
const base = path.join(__dirname, '..', 'images')
const icon = mac ? 'iconTemplate.png' : 'icon.png'

const tray = new Tray(path.join(base, icon))
if (mac) tray.setPressedImage(path.join(base, 'iconHighlight.png'))

module.exports = tray
