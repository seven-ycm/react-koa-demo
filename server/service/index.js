const httpProxy = require('../utils/httpProxy');

module.exports = {
    ownerList: async (uri) => {
        return await httpProxy.request(uri, "GET");
    },
}