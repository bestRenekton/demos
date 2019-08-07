const CONFIG = {
    "API_PREFIX": "/api", // 配置了路由前缀
    "LOG_CONFIG":
        {
            "appenders": {
                error: {
                    "category": "errorLogger", //logger名称
                    "type": "dateFile", //日志类型
                    "filename": 'logs/error/error', //日志输出位置
                    "alwaysIncludePattern": true, //是否总是有后缀名
                    "pattern": "-yyyy-MM-dd-hh.log" //后缀，每小时创建一个新的日志文件
                },
                response: {
                    "category": "resLogger",
                    "type": "dateFile",
                    "filename": 'logs/response/response',
                    "alwaysIncludePattern": true,
                    "pattern": "-yyyy-MM-dd-hh.log"
                }
            },
            "categories": {
                error: {
                    appenders: ['error'],
                    level: 'error'
                },
                response: {
                    appenders: ['response'],
                    level: 'info'
                },
                default: {
                    appenders: ['response'],
                    level: 'info'
                }
            }
        }
};
module.exports = CONFIG;