/** @format */

import { useStore, useMount, useUpdate, useLock } from '@yd/r-hooks';
import { useFetch } from '../index';
import { Props, Status, Store } from './types';

export default <D extends Record<string, any>>({
    immediate = true,
    requestUrl,
    params,
    formatParams = params => params,
    formatData = data => data
}: Props<D>) => {
    const { get } = useFetch();
    let { status, data, noMore, pageSize, pageNum, dispatch, reset } = useStore<Store<D>>({
        status: Status.None,
        noMore: false,
        pageSize: 10,
        pageNum: 1,
        data: []
    });
    const { done: onRefresh } = useLock(async () => {
        await reset(['noMore', 'pageNum', 'data']);
        return dispatch({ status: Status.Refreshing });
    });
    const { done: onPull } = useLock(() => !noMore && dispatch({ status: Status.Pulling }));
    const getData = async () => {
        const { list, total } = await get(requestUrl, await formatParams({ pageSize, pageNum, ...params }))
            .then(list => (Array.isArray(list) ? { list, total: list.length } : list))
            .catch(() => ({ list: [], total: 0 }));
        data = data.concat(await formatData(list));
        return dispatch({
            status: Status.None,
            noMore: data.length >= total,
            data,
            pageNum: pageNum + 1
        });
    };
    useUpdate(() => status !== Status.None && getData(), [status]);
    useMount(() => immediate && onRefresh());
    return {
        status,
        noMore,
        data,
        onRefresh,
        onPull
    };
};
