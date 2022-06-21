const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = Router();

router.get('/', async (ctx) => {
    ctx.response.body = '<h1>Hello World!</h1>';
})

//调用路由中间件
app.use(router.routes());

app.listen(18090, () => {
    console.log('server is running at http://localhost:18090');
})