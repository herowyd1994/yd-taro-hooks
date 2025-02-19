import { Props, Status, Store } from './types';
declare const _default: <D extends Record<string, any>>({ immediate, pageSize, requestUrl, params, formatData, ...props }: Props<D>) => {
    status: Status;
    noMore: boolean;
    data: D[];
    isLocking: boolean;
    onRefresh: () => Promise<Store<D>>;
    onPull: () => Promise<Store<D>>;
};
export default _default;
