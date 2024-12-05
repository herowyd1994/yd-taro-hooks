import * as utils from '@yd/taro-utils';
import { useRouter } from '@tarojs/taro';
import { useLock } from '@yd/r-hooks';
export default (routeNames, defaultParams, delay = 500) => {
    const { path, params } = useRouter();
    const methods = ['push', 'replace', 'reLaunch', 'switchTab'].reduce((obj, method) => {
        const { done } = useLock((key, params = {}) => utils[method](routeNames[key], params), delay);
        return { ...obj, [method]: done };
    }, {});
    const { done } = useLock(utils.back, delay);
    return {
        path,
        params: { ...defaultParams, ...params },
        ...methods,
        back: done
    };
};
