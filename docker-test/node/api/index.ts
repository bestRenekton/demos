import Koa from 'koa';
const app = new Koa();



app.use(async ctx => {
    ctx.body = "sadfsfasf";
})

app.listen(3000, () => {
    console.log('App started on http://localhost:3000')
});