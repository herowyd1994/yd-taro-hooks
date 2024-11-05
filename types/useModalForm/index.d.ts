import { Props } from './types';
import { Action, Store } from '@yd/r-hooks/types/useVerify/types';
declare const _default: <S extends Store>({ reset: r, ...props }: Props<S>) => {
    dispatch: (import("@yd/r-hooks/types/useVerify/types").Data<S> & {
        dispatch: (action: Action<S>) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        reset: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        validate: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        getValues: import("@yd/r-hooks/types/useLatest/types").Handler<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        getErrMsg: (key: keyof S) => string;
    })["dispatch"];
    reset: (import("@yd/r-hooks/types/useVerify/types").Data<S> & {
        dispatch: (action: Action<S>) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        reset: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        validate: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        getValues: import("@yd/r-hooks/types/useLatest/types").Handler<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
        getErrMsg: (key: keyof S) => string;
    })["reset"];
} & Omit<{
    validate: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
} & Omit<import("@yd/r-hooks/types/useVerify/types").Data<S> & {
    dispatch: (action: Action<S>) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    reset: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    validate: (keys?: "*" | keyof S | (keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    getValues: import("@yd/r-hooks/types/useLatest/types").Handler<import("@yd/r-hooks/types/useVerify/types").Values<S>>;
    getErrMsg: (key: keyof S) => string;
}, "validate"> & {
    onSubmit: import("../useForm/types").Handler;
    onUpdate: import("../useForm/types").Handler;
}, "reset" | "onSubmit" | "dispatch" | "onUpdate"> & {
    visible: boolean;
    onShow: (params?: Action<S>) => Promise<void>;
    onClose: () => void;
    onSubmit: (params?: Record<string, any>) => Promise<void>;
    onUpdate: (params?: Record<string, any>) => Promise<void>;
};
export default _default;
