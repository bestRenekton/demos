// next.config.js
const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')

/**
 * next的配置文件，支持配置嵌套
 */
module.exports = withTypescript(
    withSass(
        {
            cssModules: true,
            cssLoaderOptions: {
                importLoaders: 1,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
            },
            webpack(config, options) {
                // config.module.rules.push({})
                return config
            },
            exportPathMap: async function (defaultPathMap) {
                return {
                    '/': { page: '/' },
                    '/p': { page: '/detail' },
                    '/about': { page: '/about' },
                    // '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
                    // '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
                    // '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } }
                }
            }
        }
    )
)
