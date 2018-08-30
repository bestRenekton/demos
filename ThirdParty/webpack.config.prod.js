const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
});



