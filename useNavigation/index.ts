/** @format */

import * as utils from '@yd/taro-utils';
import { Back, MethodKeys, MethodFn } from './types';
import { useRouter } from '@tarojs/taro';
import { useLock } from '@yd/r-hooks';

export default <P extends Record<string, any>, R extends Record<string, any> = any>(
    routeNames?: R,
    defaultParams?: P
) => {
    const { path, params } = useRouter();
    const methods = (['push', 'replace', 'reLaunch', 'switchTab'] as MethodKeys[]).reduce(
        (obj, key) => {
            const { done } = useLock((routeKey, params = {}) => utils[key](routeNames![routeKey], params));
            return { ...obj, [key]: done };
        },
        {} as Record<MethodKeys, MethodFn<keyof R>>
    );
    const { done } = useLock(utils.back);
    return {
        path,
        params: { ...defaultParams, ...params } as P,
        ...methods,
        back: done as Back
    };
};
