import { useFetch } from '../index';
import { useStore, useLock, useUpdate } from '@yd/r-hooks';
import { transformUrlParams } from '@yd/utils';
const cache = {};
export default (url, params, { immediate = true, defaultValue, interval = 250, delay, deps = [], reset: r = false, formatParams = params => params, formatData = data => data, done, ...config } = {}) => {
    const { get } = useFetch();
    const { data, key, dispatch, reset } = useStore({
        data: void 0,
        key: ''
    });
    const { done: d1 } = useLock(async (p) => {
        r && (await reset());
        params = { ...params, ...p };
        const key = `${url}${transformUrlParams(params)}`;
        const now = Date.now();
        !Reflect.has(cache, key) &&
            Reflect.set(cache, key, { url, params, config, data: void 0, time: 0 });
        let { params: oParams, data, time } = Reflect.get(cache, key);
        !isEqual(params, oParams) && Reflect.set(cache[key], 'params', params);
        if (now - time > interval) {
            data = await formatData(await d2(key));
            Reflect.set(cache[key], 'data', data);
            Reflect.set(cache[key], 'time', now);
        }
        dispatch({ data, key });
        await done?.(data);
        return data;
    }, 0);
    const { done: d2 } = useLock(async (key) => {
        if (!Reflect.has(cache, key)) {
            return;
        }
        const { url, params, config } = Reflect.get(cache, key);
        const data = await get(url, await formatParams(params), config);
        return defaultValue && typeof defaultValue === 'object' ?
            Object.assign(defaultValue, data)
            : data;
    }, delay);
    const isEqual = (t1, t2) => JSON.stringify(t1) === JSON.stringify(t2);
    useUpdate(d1, deps, Number(!immediate));
    return {
        cache,
        data,
        key,
        dispatch,
        reset,
        onRequest: d1,
        getData: d2
    };
};
