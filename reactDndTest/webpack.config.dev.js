const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

const port = 8889;


module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        historyApiFallback: true,//spa不跳转
        host: 'localhost',
        port: port,
        // hot:true,
        inline: true,//实时刷新
        compress: true,//Enable gzip compression for everything served
        overlay: true, //Shows a full-screen overlay in the browser
        stats: "errors-only",//To show only errors in your bundle
        open: true, //When open is enabled, the dev server will open the browser.
    },
});