/** @format */

import { request } from '@tarojs/taro';
import { RequestConfig, Response } from '@yd/fetch/types';

export default (config: RequestConfig) =>
    new Promise<Response>((resolve, reject) => {
        const { method, headers: header, transformRequestUrl, transformRequestBody } = config;
        return request({
            url: transformRequestUrl!(config),
            method,
            data: transformRequestBody!(config),
            header,
            timeout: 60000,
            success({ data, header: { map: headers }, ...res }) {
                const { code, status, msg, error } = data;
                data.code = code ?? status;
                data.msg = msg ?? error;
                res.errMsg = res.errMsg ?? data.msg;
                return resolve({
                    ...res,
                    status: res.statusCode,
                    statusText: res.errMsg,
                    data,
                    headers,
                    config
                });
            },
            fail: (err) => reject({ ...err, config })
        });
    });
