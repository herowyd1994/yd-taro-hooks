/** @format */

import { useVerify, useLock } from '@yd/r-hooks';
import { useFetch, useNavigation } from '../index';
import { Props, Handler } from './types';
import { Store } from '@yd/r-hooks/useVerify/types';
import { toast } from '@yd/taro-utils';

export default <S extends Store>({
    store,
    submitUrl,
    updateUrl,
    delay,
    back = false,
    formatParams = (params) => params
}: Props<S>) => {
    const fetch = useFetch();
    const { back: b } = useNavigation();
    const { onValidate, ...verify } = useVerify(store);
    const { done: d1 } = useLock((params) => handler('post', submitUrl!, params), delay);
    const { done: d2 } = useLock((params) => handler('put', updateUrl!, params), delay);
    const handler = async (method: 'post' | 'put', url: string, params?: Record<string, any>) => {
        try {
            const res = await fetch[method](
                url,
                formatParams({ ...(await onValidate()), ...params }),
                {
                    toast: false
                }
            );
            back && b();
            return res;
        } catch (err: any) {
            toast(err.errMsg);
            return Promise.reject(err);
        }
    };
    return {
        ...verify,
        onValidate,
        onSubmit: d1 as Handler,
        onUpdate: d2 as Handler
    };
};
