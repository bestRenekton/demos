const Koa = require('koa');
const app = new Koa();

// 引入模板引擎
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');

// 引入路由文件
const rootRouter = require('./router/index.ts');
// 引入logger
const logger = require('./middleware/logger.ts');
//引入静态资源
const serve = require('koa-static');





//使用静态资源
app.use(serve(path.join(__dirname + "/public")));


// 使用模板引擎
app.use(koaNunjucks({
    ext: 'html',
    path: path.join(__dirname, 'view'),
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防止Xss
    }
}));

// 使用中间件 处理404
app.use(async (ctx, next) => {
    await next(); // 调用next执行下一个中间件
    if (ctx.status === 404) {
        await ctx.render('404');
    }
});



// 使用koa-router中间件
app.use(rootRouter.routes()).use(rootRouter.allowedMethods());
app.use(logger()); // 处理log的中间件

app.listen(3000, () => {
    console.log('App started on http://localhost:3000')
});