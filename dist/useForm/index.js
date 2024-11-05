import { useVerify, useLock } from '@yd/r-hooks';
import { useFetch, useNavigation } from '../index';
import { toast } from '@yd/taro-utils';
export default ({ store, submitUrl, updateUrl, delay, toast: t = true, back: b = false, formatParams = params => params, done }) => {
    const fetch = useFetch();
    const { back } = useNavigation();
    const { validate, ...verify } = useVerify(store);
    const { done: d1 } = useLock(params => handler('post', params), delay);
    const { done: d2 } = useLock(params => handler('put', params), delay);
    const handler = async (method, params) => {
        try {
            const res = await fetch[method](method === 'post' ? submitUrl : updateUrl, await formatParams({ ...(await validate()), ...params }), { toast: false });
            await done?.(res);
            t && toast(`${method === 'post' ? '提交' : '更新'}成功`);
            b && back();
            return res;
        }
        catch (err) {
            toast(err.errMsg);
            return Promise.reject(err);
        }
    };
    return {
        validate,
        ...verify,
        onSubmit: d1,
        onUpdate: d2
    };
};
