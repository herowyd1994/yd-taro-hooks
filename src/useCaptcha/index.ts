/** @format */

import { useCountDown, useLock } from '@yd/r-hooks';
import { useForm, useFetch } from '../index';
import { Props, Handler } from './types';
import { Store } from '@yd/r-hooks/types/useVerify/types';
import { toast } from '@yd/taro-utils';

export default <S extends Store>({
    store,
    tip: value,
    time = 60,
    reset = true,
    delay,
    requestUrl,
    formatTime = time => `${time}s`,
    ...props
}: Props<S>) => {
    const { get } = useFetch();
    const { mobile, tip, ...form } = useForm({
        ...props,
        store: { ...store, tip: { value } },
        delay
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
    const { done, unLock } = useLock(async (params, config) => {
        try {
            await get(
                requestUrl,
                { ...(await mobile.validate()), ...params },
                { ...config, toast: false }
            );
            toast('发送成功');
        } catch (err) {
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
        mobile,
        tip: tip.value,
        ...form,
        getCaptcha: done as Handler,
        onAbort
    };
};
