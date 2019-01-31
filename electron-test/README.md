# electron-packager-test

#### 项目介绍
Electron打包成win安装包并创建桌面快捷方式


#### 使用步骤

1. 删除electron和install,防止老文件
2. 考入自己项目文件到更目录
3. cnpm i 或者npm i 
4. 修改main.js中fileUrl为自己的更新包资源地
5. 修改build.js中的安装包名称，图标等
6. npm run packager 打包  
7. 注意：需要先进入electron项目，‘比如D:\phpStudy\WWW\others\electron-test\electron\ElectronTest-win32-x64\resources\app’，安装cnpm i request adm-zip
8. node build.js 打包成win安装包

