const package = require('../package.json')
const { app, shell } = require('electron')

const menu = [
  { id: 'life' },
  { type: 'separator' },

  { id: 'date', enabled: false, label: '급식 정보를 불러오는 중...' },
  { id: 'breakfast' },
  { id: 'lunch' },
  { id: 'dinner' },
  { id: 'snack' },

  { type: 'separator' },
  { label: '앱 정보', click: () => shell.openExternal(package.repository) },
  { label: '앱 끝내기', click: () => app.quit() }
]

module.exports = menu
