const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')

  return Promise.resolve({
    appDirectory: 'release-builds/Electron-tutorial-app-win32-ia32',
    outputDirectory: 'release-builds/installer64',
    authors: 'Puxuan He',
    exe: '海外音悦台.exe',
    setupExe: 'haiwaimusicInstall.exe',
    setupIcon: 'icon.ico'
  })
}