import axios, {AxiosRequestConfig} from "axios";
import config from "../config";
import {ErrorMsgCodeValue, HTTP_CODE} from "./enum";
import {getCookie, TranslateErrorMsgCodeValue, showMessage} from "./function";

// 请求拦截器
axios.interceptors.request.use(
    (cfg) => {
        const c = cfg;
        // 先把config.url进行URI编码，然后全局替换其中的特殊字符，然后再URI解码
        c.url = decodeURI(encodeURI(c.url || "").replace(/%E2%80%8B/g, ""));
        return cfg;
    },
    (error) => {
        return Promise.reject(error);
    },
);
axios.defaults.baseURL = config.apiHost;
axios.defaults.timeout = 30 * 1000;
axios.interceptors.request.use(
    async (cfg) => {
        interface IAxios extends AxiosRequestConfig {
            type?: string
        }

        const loginToken = getCookie("loginToken");
        const c: IAxios = cfg;
        c.headers = {
            "Content-type": c.type && c.type === "form" ? "multipart/form-data" : "application/json",
            Authorization: loginToken
        };
        return cfg;
    },
    (err) => Promise.reject(err),
);
axios.interceptors.response.use(
    (response) => {
        // 捕获业务异常提示码提示/拦截
        if (ErrorMsgCodeValue.includes(response?.data?.result?.state)) {
            showMessage({content: TranslateErrorMsgCodeValue(response?.data?.result?.state), type: "error"});
        }
        return response?.data?.result;
    },
    (error) => {
        // 获取HTTP错误状态码，可做提示/拦截
        if (error.response?.status !== HTTP_CODE.SUCCESS) {
            showMessage({content: "网络错误", type: "error"});
        }
        return Promise.reject(error);
    },
);

export default axios;
