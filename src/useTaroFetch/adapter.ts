/** @format */

import { request } from '@tarojs/taro';
import { RequestConfig, Response } from '@yd/fetch/types/types';

export default (config: RequestConfig) =>
    new Promise<Response>((resolve, reject) => {
        const { method, headers: header, transformRequestUrl, transformRequestBody } = config;
        request({
            url: transformRequestUrl!(config),
            method,
            data: transformRequestBody!(config),
            header,
            timeout: 60000,
            success({ data, header, statusCode: status, errMsg, ...res }) {
                const { code, msg } = data;
                data.code = code ?? status;
                resolve({
                    ...res,
                    status,
                    errMsg: msg ?? errMsg,
                    headers: header as Headers,
                    data,
                    config
                });
            },
            fail: ({ statusCode: status, header: headers, ...err }: any) =>
                reject({ ...err, status, headers, config })
        });
    });
