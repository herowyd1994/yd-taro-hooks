/** @format */

import { throttle } from '@yd/utils';
import * as utils from '@yd/taro-utils';
import { Back, MethodKeys, MethodFn } from './types';
import { useRouter } from '@tarojs/taro';

export default <R extends Record<string, any>, P extends Record<string, any> = any>(
    routeNames?: R,
    defaultParams?: P
) => {
    const { path, params } = useRouter();
    const { back: b } = utils;
    const methods = (['push', 'replace', 'reLaunch', 'switchTab'] as MethodKeys[]).reduce(
        (obj, key) => {
            const fn: MethodFn<keyof R> = throttle((routeKey, params = {}) =>
                utils[key](routeNames![routeKey], params)
            );
            return { ...obj, [key]: fn };
        },
        {} as Record<MethodKeys, MethodFn<keyof R>>
    );
    const back: Back = throttle(b);
    return {
        path,
        params: { ...defaultParams, ...params } as P,
        ...methods,
        back
    };
};
