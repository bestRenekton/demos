// const Router = require('koa-router');
// const router = new Router();
const router = require('koa-router')();
const config = require('../config.ts');//引入配置


// router.prefix(config.API_PREFIX); // 设置路由前缀



// 路由
const index = async (ctx, next) => {
    await ctx.render('index', { title: 'Index', txt: 'txtxtxxtx' });
};
const home = require('./home.ts');



router.get('/', index);
router.get('/index', index);
router.get('/home', home);

module.exports = router;