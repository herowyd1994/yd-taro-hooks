import { useCountDown, useLock } from '@yd/r-hooks';
import { useFetch, useForm } from '../index';
import { toast } from '@yd/taro-utils';
export default ({ store, tip: value, time = 60, reset = true, delay, request: { url, params, formatParams: f = params => params, ...config } = { url: '' }, formatTime = time => `${time}s`, formatParams = params => params, ...props }) => {
    const { get } = useFetch();
    const { mobile, tip, ...form } = useForm({
        store: { ...store, tip: { value } },
        delay,
        formatParams,
        ...props
    });
    const { countDown, abort } = useCountDown({
        time,
        reset,
        delay: 0,
        formatTime: t => {
            t === time ? tip.reset() : tip.setValue(formatTime(t));
            return t;
        }
    });
    const { done: getCaptcha, unLock } = useLock(async () => {
        try {
            await get(url, await f({ ...(await mobile.validate()), ...params }), {
                toast: false,
                ...config
            });
            toast('发送成功');
        }
        catch (err) {
            toast(err.errMsg);
            return Promise.reject(err);
        }
        return countDown();
    }, delay);
    const onAbort = async () => {
        await unLock();
        return abort();
    };
    return {
        ...form,
        mobile,
        tip: tip.value,
        getCaptcha,
        onAbort
    };
};
