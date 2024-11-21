import { Props, Status, Store } from './types';
declare const _default: <D extends Record<string, any>>({ immediate, pageSize, requestUrl, params, formatParams, formatData }: Props<D>) => {
    status: Status;
    noMore: boolean;
    data: D[];
    onRefresh: () => Promise<Store<D>>;
    onPull: () => Promise<Store<D>>;
};
export default _default;
