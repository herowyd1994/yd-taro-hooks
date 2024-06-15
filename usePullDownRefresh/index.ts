/** @format */

import { useStore, useMount, useUpdate } from '@yd/r-hooks';
import { useFetch } from '../index';
import { Props, Status, Store } from './types';

export const PullDownRefreshStatus = Status;
export default <D extends Record<string, any>>({
    immediate = true,
    requestUrl,
    formatParams = params => params,
    formatData = data => data
}: Props<D>) => {
    const { get } = useFetch();
    let { status, data, noMore, pageSize, pageNum, dispatch, reset } = useStore<Store<D>>({
        status: PullDownRefreshStatus.None,
        noMore: false,
        pageSize: 10,
        pageNum: 1,
        data: []
    });
    const onRefresh = async () => {
        await reset(['noMore', 'data', 'pageNum']);
        return dispatch({ status: PullDownRefreshStatus.Refreshing });
    };
    const onPull = () => !noMore && dispatch({ status: PullDownRefreshStatus.Pulling });
    const getData = async () => {
        const { list, total } = await get(requestUrl, await formatParams({ pageSize, pageNum }))
            .then(list => (Array.isArray(list) ? { list, total: list.length } : list))
            .catch(() => ({ list: [], total: 0 }));
        data = data.concat(await formatData(list));
        return dispatch({
            status: PullDownRefreshStatus.None,
            noMore: data.length >= total,
            data,
            pageNum: pageNum + 1
        });
    };
    useUpdate(() => status !== PullDownRefreshStatus.None && getData(), [status]);
    useMount(() => immediate && onRefresh());
    return {
        status,
        noMore,
        data,
        onRefresh,
        onPull
    };
};
