const rp = require('request-promise');

module.exports = {
    request: async (uri, method) => {
        console.log('httpProxy:::::::::::::::::::::::::::::request');
        const response = await rp({
            uri,
            method,
            // body: requestBody,
            // json: true
        }).then((res) => {
            console.log('res: ', JSON.parse(res.toString()));
            if (!res) {
                return {err: 'no data!'};
            }
            return JSON.parse(res.toString());
        }).catch((err) => ({err}));

        return {result: {state: response.err ? 'failed' : 'success', data: response}};
    },
}