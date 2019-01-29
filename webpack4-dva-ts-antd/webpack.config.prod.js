const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
// const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');



module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        // new CompressionPlugin(),//gzip压缩
        new BundleAnalyzerPlugin({ analyzerPort: 8919 })//依赖图
    ]
});



