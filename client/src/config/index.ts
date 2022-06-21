import {getRunEnv} from "../utils/Env";

const commonConf: any = {
};
const config: any = {
    local: { // 本地
        ...commonConf,
        domain: "https://localhost:3000",
        apiHost: "http://localhost:18090/",
        portalHost: "",
        homePath: "/ownerList",
    },

    development: { // 开发
        ...commonConf,
        domain: "",
        apiHost: "",
        portalHost: "",
        homePath: "/ownerList",
    },

    production: { // 生产
        ...commonConf,
        domain: "",
        apiHost: "",
        portalHost: "",
        homePath: "/ownerList",
    }
};
export default config[getRunEnv()];
