import { useFetch } from '../index';
import { useStore, useLock, useUpdate } from '@yd/r-hooks';
import { transformUrlParams } from '@yd/utils';
const cache = {};
export default (url, params, { immediate = true, interval = 1500, delay, deps = [], done: d, ...config } = {}) => {
    const { get } = useFetch();
    const { data, key, dispatch } = useStore({
        data: void 0,
        key: ''
    });
    const { done, lock: isLoading } = useLock(async (p) => {
        params = { ...params, ...p };
        const key = `${url}${transformUrlParams(params)}`;
        !Reflect.has(cache, key) &&
            Reflect.set(cache, key, { url, params, config, data: void 0, time: 0 });
        let { data, time } = Reflect.get(cache, key);
        if (Date.now() - time > interval) {
            data = await get(url, params, config);
            Reflect.set(cache, key, { url, params, config, data, time: Date.now() });
            dispatch({ data, key });
            await d?.(data);
        }
        return data;
    }, delay);
    useUpdate(done, deps, Number(!immediate));
    return {
        data,
        key,
        dispatch,
        request: done,
        isLoading
    };
};
