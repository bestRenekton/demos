const path = require('path');
const opn = require('opn');
const autoprefixer = require('autoprefixer');

const port = 8888;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "",
        chunkFilename: "[name].js",
        filename: "[name].js"
    },
    optimization: {
        minimize: true, //是否进行代码压缩
        splitChunks: {
            chunks: "async",
            minSize: 30000, //模块大于30k会被抽离到公共模块
            minChunks: 1, //模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {//图片
                test: /\.(png|jpg|gif|svg|ico)$/i,//i不区分大小写
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './static/media/'//图片输出位置
                        }
                    },
                    'image-webpack-loader'//图片压缩工具
                ]
            },
            {//字体图标
                test: /\.(eot|woff|woff2|ttf)$/i,
                // include: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30000,
                        outputPath: './static/font/'//图片输出位置
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: require.resolve('css-loader'),
                        // options: {
                        //     importLoaders: 1,
                        //     modules: true,
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        // },
                    },
                ]
            },
            {
                test: /\.less$/,
                // include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                // include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new webpack.HotModuleReplacementPlugin()
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),//模板
            filename: 'index.html',
            inject: false, //允许插件修改哪些内容，包括head与body
            hash: true, //是否添加hash值
            minify: { //压缩HTML文件
                removeComments: true,//移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
            chunksSortMode: 'none' //如果使用webpack4将该配置项设置为'none'
        })
    ]
}