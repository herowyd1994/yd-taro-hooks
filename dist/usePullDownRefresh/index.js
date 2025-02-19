import { useStore, useMount, useUpdate, useLock } from '@yd/r-hooks';
import { useFetch } from '../index';
import { Status } from './types';
export default ({ immediate = true, pageSize = 10, requestUrl, params, formatData = data => data, ...props }) => {
    const { get } = useFetch();
    let { status, noMore, pageNum, data, $dispatch } = useStore({
        status: Status.None,
        noMore: false,
        pageNum: 1,
        data: []
    });
    const onRefresh = () => $dispatch({ status: Status.Refreshing, noMore: false, pageNum: 1, data: [] });
    const onPull = () => !noMore && $dispatch({ status: Status.Pulling });
    const { isLocking, done } = useLock(async () => {
        const { list, total } = await get(requestUrl, { ...params, pageSize, pageNum }, {
            ...props,
            formatData: list => (Array.isArray(list) ? { list, total: list.length } : list)
        }).catch(() => ({ list: [], total: 0 }));
        data = data.concat(await formatData(list));
        return $dispatch({
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
        isLocking,
        onRefresh,
        onPull
    };
};
