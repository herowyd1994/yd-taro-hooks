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
    back: b = false,
    formatParams = (params) => params,
    done
}: Props<S>) => {
    const fetch = useFetch();
    const { back } = useNavigation();
    const { onValidate, ...verify } = useVerify(store);
    const { done: d1 } = useLock((params) => handler('post', params), delay);
    const { done: d2 } = useLock((params) => handler('put', params), delay);
    const handler = async (method: 'post' | 'put', params?: Record<string, any>) => {
        try {
            const res = await fetch[method](
                method === 'post' ? submitUrl! : updateUrl!,
                formatParams({ ...(await onValidate()), ...params }),
                { toast: false }
            );
            done?.(res);
            b && back();
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
