const Router = require('koa-router');
const controller = require('../controller')

const router = Router();

module.exports = (app) => {
    router.post('/api/ownerList', controller.ownerList);

    // add router middleware
    app.use(router.routes())
        .use(router.allowedMethods());
}