var electronInstaller = require('electron-winstaller');
var path = require("path");

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: path.join('./electron/ElectronTest-win32-x64'),
  outputDirectory: path.join('./installer/installer64'),
  authors: 'yyt',
  exe: 'ElectronTest.exe',
  setupIcon: path.join('icon.ico'),//安装图标，必须本地
  iconUrl: 'http://pm72qibzx.bkt.clouddn.com/icon.ico',//程序图标，必须url
  noMsi: true,
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));