const service = require('../service')

module.exports = {
    ownerList: async (ctx) => {
        const remoteUrl = 'http://5c92dbfae7b1a00014078e61.mockapi.io/owners';
        const res = await service.ownerList(remoteUrl);
        console.log('ownerList:::::::::::::::::::::::::::::', JSON.stringify(res));

        ctx.response.body = res;
    },
}