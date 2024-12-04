/** @format */

import { useStore, useMount, useUpdate, useLock } from '@yd/r-hooks';
import { useFetch } from '../index';
import { Props, Status, Store } from './types';

export default <D extends Record<string, any>>({
    immediate = true,
    pageSize = 10,
    requestUrl,
    params,
    formatParams = params => params,
    formatData = data => data
}: Props<D>) => {
    const { get } = useFetch();
    let { status, noMore, pageNum, data, dispatch } = useStore<Store<D>>({
        status: Status.None,
        noMore: false,
        pageNum: 1,
        data: []
    });
    const onRefresh = () =>
        dispatch({ status: Status.Refreshing, noMore: false, pageNum: 1, data: [] });
    const onPull = () => !noMore && dispatch({ status: Status.Pulling });
    const { done } = useLock(async () => {
        const { list, total } = await get(
            requestUrl,
            await formatParams({ pageSize, pageNum, ...params })
        )
            .then(list => (Array.isArray(list) ? { list, total: list.length } : list))
            .catch(() => ({ list: [], total: 0 }));
        data = data.concat(await formatData(list));
        return dispatch({
            status: Status.None,
            noMore: data.length >= total,
            pageNum: pageNum + 1,
            data
        });
    });
    useUpdate(() => status !== Status.None && done(), [status]);
    useMount(() => immediate && onRefresh());
    return {
        status,
        noMore,
        data,
        onRefresh,
        onPull
    };
};