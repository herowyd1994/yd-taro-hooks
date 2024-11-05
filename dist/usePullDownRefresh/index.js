import { useStore, useMount, useUpdate, useLock } from '@yd/r-hooks';
import { useFetch } from '../index';
import { Status } from './types';
export default ({ immediate = true, requestUrl, params, formatParams = params => params, formatData = data => data }) => {
    const { get } = useFetch();
    let { status, noMore, pageSize, pageNum, data, dispatch, reset } = useStore({
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
