import { Props, Handler } from './types';
import { Store } from '@yd/r-hooks/types/useVerify/types';
declare const _default: <S extends Store>({ store, submitUrl, updateUrl, delay, toast: t, back: b, formatParams, done }: Props<S>) => {
    validate: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
} & Omit<import("@yd/r-hooks/types/useVerify/types").Data<S> & {
    dispatch: (action: import("@yd/r-hooks/types/useVerify/types").Action<S>) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    reset: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    validate: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    getValues: import("@yd/r-hooks/types/useLatest/types").Handler<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    getErrMsg: (key: keyof S) => string;
}, "validate"> & {
    onSubmit: Handler;
    onUpdate: Handler;
};
export default _default;