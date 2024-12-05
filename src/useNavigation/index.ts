/** @format */

import * as utils from '@yd/taro-utils';
import { Back, Methods } from './types';
import { useRouter } from '@tarojs/taro';
import { useLock } from '@yd/r-hooks';

export default <P extends Record<string, any>, R extends Record<string, any> = any>(
    routeNames?: R,
    defaultParams?: P,
    delay: number = 500
) => {
    const { path, params } = useRouter();
    const methods = ['push', 'replace', 'reLaunch', 'switchTab'].reduce(
        (obj, method) => {
            const { done } = useLock(
                (key, params = {}) => utils[method](routeNames![key], params),
                delay
            );
            return { ...obj, [method]: done };
        },
        {} as Methods<keyof R>
    );
    const { done } = useLock(utils.back, delay);
    return {
        path,
        params: { ...defaultParams, ...params } as P,
        ...methods,
        back: done as Back
    };
};
