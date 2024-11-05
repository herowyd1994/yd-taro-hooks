import { Props } from './types';
import { Store } from '@yd/r-hooks/types/useVerify/types';
declare const _default: <S extends Store>({ store, tip: value, time, reset, delay, request: { url, params, formatParams: f, ...config }, formatTime, formatParams, ...props }: Props<S>) => {
    mobile: (import("@yd/r-hooks/types/useVerify/types").Data<S> & {
        dispatch: (action: import("@yd/r-hooks/types/useVerify/types").Action<S>) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        reset: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        validate: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        getValues: import("@yd/r-hooks/types/useLatest/types").Handler<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        getErrMsg: (key: keyof S) => string;
    })[string];
    tip: any;
} & Omit<{
    validate: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
} & Omit<import("@yd/r-hooks/types/useVerify/types").Data<S> & {
    dispatch: (action: import("@yd/r-hooks/types/useVerify/types").Action<S>) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    reset: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    validate: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    getValues: import("@yd/r-hooks/types/useLatest/types").Handler<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    getErrMsg: (key: keyof S) => string;
}, "validate"> & {
    onSubmit: import("../useForm/types").Handler;
    onUpdate: import("../useForm/types").Handler;
}, "mobile" | "tip"> & {
    getCaptcha: import("@yd/r-hooks/types/useLatest/types").Handler<Promise<Promise<void>>>;
    onAbort: () => Promise<void>;
};
export default _default;
