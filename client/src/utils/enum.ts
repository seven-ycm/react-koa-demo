/**
 * 错误码
 */
export enum ERROR_CODE {
    SUCCESS, // 成功状态码
}

export enum HTTP_CODE {
    SUCCESS = 200, // http成功状态码
    OVERDUE = 401, // http过期状态码
    NO_CSRF = 403, // csrf失效
}

/**
 * 后台错误码
 */
export enum SERVICE_ERROR_CODE {
    STATE_ERROR = 11, // '业务失败'
    STATE_ARGS_ERROR = 12, //'参数非法'
    STATE_DATA_LOST = 13, //'数据缺失'
    STATE_ILLEGALITY_TOKEN = 14, //'token校验失效'
    STATE_SERVER_LOST = 15, //'服务丢失'
    STATE_REQUEST_REFUSE = 16, //'请求被拒绝'
}

export const ErrorMsgCodeValue = [
    SERVICE_ERROR_CODE.STATE_ERROR,
    SERVICE_ERROR_CODE.STATE_ARGS_ERROR,
    SERVICE_ERROR_CODE.STATE_DATA_LOST,
    SERVICE_ERROR_CODE.STATE_ILLEGALITY_TOKEN,
    SERVICE_ERROR_CODE.STATE_SERVER_LOST,
    SERVICE_ERROR_CODE.STATE_REQUEST_REFUSE,
];
