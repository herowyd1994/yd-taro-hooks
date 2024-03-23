/** @format */

import { useCountDown, useLock } from '@yd/r-hooks';
import { useFetch, useForm } from '../index';
import { Props } from './types';
import { Store } from '@yd/r-hooks/useVerify/types';
import { toast } from '@yd/taro-utils';

export default <S extends Store>({
    store,
    tip: value,
    time = 60,
    reset = true,
    delay,
    requestUrl,
    formatTime = (time) => `${time}s`,
    formatParams = (params) => params,
    ...props
}: Props<S>) => {
    const { get } = useFetch();
    const { mobile, tip, ...form } = useForm({
        store: { ...store, tip: { value } },
        delay,
        formatParams,
        ...props
    });
    const { onCountDown, onAbort: abort } = useCountDown({
        time,
        reset,
        delay: 0,
        formatTime: (t) => {
            t === time ? tip.reset() : tip.setValue(formatTime(t));
            return t;
        }
    });
    const { done: getCaptcha, unLock } = useLock(async () => {
        try {
            await get(requestUrl, formatParams(await mobile.validate()), { toast: false });
        } catch (err: any) {
            toast(err.errMsg);
            return Promise.reject(err);
        }
        return await onCountDown();
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
