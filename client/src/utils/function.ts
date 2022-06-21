import React from "react";
import moment from "moment";
import {message} from "antd";

/**
 * 写入Cookie字段
 * @param key
 * @param value
 */
export function setCookie(key, value) {
    let cookies = {};
    let expireTime = moment().add(30, "days").toDate();
    const expires = `expires=${expireTime}`;
    const path = "path=/";
    cookies[key] = value;
    let cookie = Object.keys(cookies).map(k => `${k}=${cookies[k]}`).join("; ");
    document.cookie = `${cookie}; ${expires}; ${path}`;
}

export function setLoginCookies(cookies) {
    cookies.forEach(cookie => setCookie(cookie.Name, cookie.Value));
}

/**
 * 读取Cookie字段
 * @param key
 */
export function getCookie(key): string {
    let cookieStr = document.cookie.split("; ");
    for (let i = 0; i < cookieStr.length; i++) {
        let [cookieKey, cookieValue] = cookieStr[i].split("=");
        if (!cookieKey) continue;
        if (cookieKey === key) {
            return cookieValue;
        }
    }
    return "";
}

/**
 * message提示
 * @param options 提示配置选项
 * @options content 提示内容
 * @options type 提示类型（非必须 默认值："success"）
 * @options duration 自动关闭延时（非必须 默认值：3m）
 */
export function showMessage(options: { content: React.ReactNode, type?: "success" | "warning" | "error" | "info", duration?: number }) {
    const {content, type = "success", duration = 3} = options;
    message[type](content, duration);
}

export function TranslateErrorMsgCodeValue(value, defaultValue?) {
    const result = {
        11: "业务失败",
        12: "参数非法",
        13: "数据缺失",
        14: "token校验失效",
        15: "服务丢失",
        16: "请求被拒绝",
    }[value];
    if (!result) {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error(value + " is not in ErrorCode");
    }
    return result;
}