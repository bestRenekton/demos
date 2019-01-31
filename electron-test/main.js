// Modules to control application life and create native browser window
const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const Menu = electron.Menu;
const path = require('path');
if (require('electron-squirrel-startup')) return;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


const request = require('request');
const http = require('http');
const fs = require('fs');
const adm_zip = require('adm-zip');
const { dialog } = require('electron')



function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1280, height: 1024 })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu) // 设置菜单部分
  createWindow()
})
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
  app.quit()
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


/**
 * 注册键盘快捷键
 * 其中：label: '切换开发者工具',这个可以在发布时注释掉
 */
let template = [
  {
    label: 'Edit ( 操作 )',
    submenu: [{
      label: 'Copy ( 复制 )',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: 'Paste ( 粘贴 )',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: 'Reload ( 重新加载 )',
      accelerator: 'CmdOrCtrl+R',
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          // on reload, start fresh and close any old
          // open secondary windows
          if (focusedWindow.id === 1) {
            BrowserWindow.getAllWindows().forEach(function (win) {
              if (win.id > 1) {
                win.close()
              }
            })
          }
          focusedWindow.reload()
        }
      }
    }]
  },
  {
    label: 'Window ( 窗口 )',
    role: 'window',
    submenu: [{
      label: 'Minimize ( 最小化 )',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: 'Close ( 关闭 )',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }, {
      label: '切换开发者工具',
      accelerator: (function () {
        if (process.platform === 'darwin') {
          return 'Alt+Command+I'
        } else {
          return 'Ctrl+Shift+I'
        }
      })(),
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }
    }, {
      type: 'separator'
    }]
  },
  {
    label: 'Help ( 帮助 ) ',
    role: 'help',
    submenu: [{
      label: 'FeedBack ( 意见反馈 )',
      // click: function () {
      //   electron.shell.openExternal('www.yangyuetao.cn')
      // }
    }]
  }
]

/**
* 增加更新相关的菜单选项
*/
function addUpdateMenuItems(items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  },
    // {
    //   label: '更新',
    //   enabled: true,
    //   key: 'checkingForUpdate',
    //   click: function () {
    //     checkUpdate();
    //   }
    // },
    // {
    //   label: 'Check for Update',
    //   visible: false,
    //   key: 'checkForUpdate',
    //   click: function () {
    //     require('electron').autoUpdater.checkForUpdates()
    //   }
    // },
    // {
    //   label: 'Restart and Install Update',
    //   enabled: true,
    //   visible: false,
    //   key: 'restartToUpdate',
    //   click: function () {
    //     require('electron').autoUpdater.quitAndInstall()
    //   }
    // }
  ]

  items.splice.apply(items, [position, 0].concat(updateItems))
}
/**
 * 检测更新
 */
// const baseUrl = "./";
const baseUrl = "./resources/app/";
const fileUrl = "http://pm72qibzx.bkt.clouddn.com/";//这里需要修改为自己的资源外网
(function () {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `${fileUrl}package.json?v=${new Date().getTime()}`,//请求package.json，与本地对比版本号
      },
      (error, res, body) => {
        try {
          if (error || res.statusCode !== 200) {
            throw '更新版本号失败，请联系管理员';
          }
          const json = JSON.parse(body);
          const { version, description } = json;
          const localVersion = electron.app.getVersion();
          // console.log(version, localVersion)
          if (version != localVersion) {
            mainWindow.webContents.send('updating', '更新中')
            console.log('need update')
            dialog.showMessageBox({
              type: 'info',
              title: '发现新版本',
              message: '请点击按钮进行更新，预计持续几分钟，期间请不要操作，更新后会自动重启',
              buttons: ['马上更新']
            },
              // (index) => {
              //   if (index == 0) {
              //     mainWindow.setProgressBar(0.5)
              //   } else {
              //   }
              // }
            )
            mainWindow.setProgressBar(0.5);
            downLoad()
              .then(() => {
                console.log('update success')
                //重写版本号到本地
                fs.readFile(`${baseUrl}package.json`, function (err, data) {
                  if (err) {
                    return console.error(err);
                  }
                  let newData = JSON.parse(data);
                  newData.version = version;
                  fs.writeFile(`${baseUrl}package.json`, JSON.stringify(newData), function (err) {
                    if (err) {
                      return console.error(err);
                    }
                    // 重启
                    app.relaunch({ args: process.argv.slice(1) });
                    app.exit(0);
                  });
                });
              })
          } else {
            console.log('no update')
          }
        } catch (err) {
          reject(err);
        }
      })
  })
})()
/**
 * 更新
 */
const downLoad = () => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(`${baseUrl}temp/dist.zip`);
    const url = `${fileUrl}dist.zip?v=${new Date().getTime()}`;
    request(url).pipe(stream).on('close', () => {
      const unzip = new adm_zip(`${baseUrl}temp/dist.zip`);
      unzip.extractAllTo(`${baseUrl}`, /*overwrite*/true);
      resolve()
    });
  })
}

function findReopenMenuItem() {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

// 针对Mac端的一些配置
if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: 'Quit ( 退出 )',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })

  // Window menu.
  template[3].submenu.push({
    type: 'separator'
  }, {
      label: 'Bring All to Front',
      role: 'front'
    })

  addUpdateMenuItems(template[0].submenu, 1)
}

// 针对Windows端的一些配置
if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}
