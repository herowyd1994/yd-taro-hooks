/** @format */

import { createFetch as create } from '@yd/fetch';
import { Config } from '@yd/fetch/types';
import adapter from './adapter';
import { throttle } from '@yd/utils';
import { getStorage, removeStorage, toast, push } from '@yd/taro-utils';
import { getCurrentPages } from '@tarojs/taro';

export { useFetch } from '@yd/fetch';
export const createFetch = ({
    onHeader = async (headers) =>
        Object.assign(headers, { Authorization: await getStorage('Authorization') }),
    onLogout = async () => {
        const arr = getCurrentPages();
        if (arr[arr.length - 1].route === 'pages/login/index') {
            return;
        }
        await removeStorage('Authorization');
        push('/pages/login/index');
    },
    onError = ({ statusText }) => toast(statusText),
    transformRequestBody = ({ body }) => body,
    ...config
}: Config) => {
    create({
        adapter,
        onHeader,
        onLogout: throttle(onLogout),
        onError,
        transformRequestBody,
        ...config
    });
};
