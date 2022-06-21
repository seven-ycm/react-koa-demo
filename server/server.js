const Koa = require('koa');
// const Router = require('koa-router');
const router = require('./router')
const bodyParser = require('koa-bodyparser');

const app = new Koa();
// const router = Router();

app.use(bodyParser());

// router.get('/', async (ctx) => {
//     ctx.response.body = '<h1>Hello World!</h1>';
// })

//调用路由中间件
// app.use(router.routes());
router(app);

app.listen(18090, () => {
    console.log('server is running at http://localhost:18090');
})