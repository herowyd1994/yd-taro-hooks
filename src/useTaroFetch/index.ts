/** @format */

import { createFetch as create } from '@yd/fetch';
import { Config } from '@yd/fetch/types/types';
import adapter from './adapter';
import { getStorage, removeStorage, toast, push } from '@yd/taro-utils';
import { getCurrentPages } from '@tarojs/taro';
import { throttle } from '@yd/utils';

export { useFetch } from '@yd/fetch';
export const createFetch = ({
    onHeader = async headers =>
        Object.assign(headers, {
            Authorization: await getStorage('Authorization')
        }),
    onLogout = async () => {
        const arr = getCurrentPages();
        if (arr[arr.length - 1].route === 'pages/login/index') {
            return;
        }
        await removeStorage('Authorization');
        push('/pages/login/index');
    },
    onError = ({ errMsg }) => toast(errMsg),
    transformRequestBody = ({ body }) => body,
    ...config
}: Config) =>
    create({
        ...config,
        adapter,
        onHeader,
        onLogout: throttle(onLogout),
        onError,
        transformRequestBody
    });
