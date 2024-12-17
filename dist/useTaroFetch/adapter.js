import { request } from '@tarojs/taro';
export default (config) => new Promise((resolve, reject) => {
    const { method, headers: header, transformRequestUrl, transformRequestBody } = config;
    request({
        url: transformRequestUrl(config),
        method,
        data: transformRequestBody(config),
        header,
        timeout: 60000,
        success({ data, header, statusCode: status, errMsg, ...res }) {
            const { code, msg } = data;
            data.code = code ?? status;
            resolve({
                ...res,
                status,
                errMsg: msg ?? errMsg,
                headers: header,
                data,
                config
            });
        },
        fail: ({ statusCode: status, header: headers, ...err }) => reject({
            ...err,
            status,
            headers,
            config
        })
    });
});
