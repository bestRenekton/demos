// const router = require('koa-router')();

const home = async (ctx, next) => {
    await ctx.render('home', {title: 'Home1111', txt: 'asdfsfsaf'});
};

module.exports = home;

