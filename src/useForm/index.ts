/** @format */

import { useVerify, useLock } from '@yd/r-hooks';
import { useFetch, useNavigation } from '../index';
import { Props, Handler, Config } from './types';
import { Store } from '@yd/r-hooks/dist/useVerify/types';
import { toast } from '@yd/taro-utils';

export default <S extends Store>({
    store,
    submitUrl,
    updateUrl,
    delay,
    toast: t = true,
    back: b = false,
    done,
    ...props
}: Props<S>) => {
    const fetch = useFetch();
    const { back } = useNavigation();
    const { validate, ...verify } = useVerify(store);
    const { done: d1 } = useLock((params, config) => handler('post', params, config), delay);
    const { done: d2 } = useLock((params, config) => handler('put', params, config), delay);
    const handler = async (
        method: 'post' | 'put',
        params?: Record<string, any>,
        config?: Config
    ) => {
        try {
            const res = await fetch[method](
                method === 'post' ? submitUrl! : updateUrl!,
                { ...(await validate()), ...params },
                { ...props, ...config, toast: false }
            );
            await done?.(res);
            t && toast(`${method === 'post' ? '提交' : '更新'}成功`);
            b && back();
            return res;
        } catch (err) {
            toast(err.errMsg);
            return Promise.reject(err);
        }
    };
    return {
        validate,
        ...verify,
        onSubmit: d1 as Handler,
        onUpdate: d2 as Handler
    };
};
