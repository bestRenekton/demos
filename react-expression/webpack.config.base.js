
const path = require('path');
const DIST_PATH = path.resolve(__dirname, 'dist/testPlugin');
const autoprefixer = require('autoprefixer');


module.exports = {
    // entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: DIST_PATH,
        publicPath: "",
        chunkFilename: "[name].js",
        filename: "expression.js",
        libraryTarget: 'umd',
        library: 'expression'
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     },
    //     runtimeChunk: true
    // },
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
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         outputPath: './static/img/'//图片输出位置
                    //     }
                    // },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 9999999
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
            {//数据
                test: [/\.json$/i],//i不区分大小写
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './static/data/'//图片输出位置
                        }
                    }
                ]
            },
            {//音乐
                test: [/\.mp3$/i],//i不区分大小写
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './static/music/'//图片输出位置
                        }
                    }
                ]
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
    ],
};