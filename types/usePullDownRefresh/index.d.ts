import { Props, Status, Store } from './types';
declare const _default: <D extends Record<string, any>>({ immediate, requestUrl, params, formatParams, formatData }: Props<D>) => {
    status: Status;
    noMore: boolean;
    data: D[];
    onRefresh: import("@yd/r-hooks/types/useLatest/types").Handler<Promise<Promise<Store<D>>>>;
    onPull: import("@yd/r-hooks/types/useLatest/types").Handler<Promise<Promise<Store<D>>>>;
};
export default _default;
