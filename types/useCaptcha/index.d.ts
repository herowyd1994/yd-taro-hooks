import { Props } from './types';
import { Store } from '@yd/r-hooks/types/useVerify/types';
declare const _default: <S extends Store>({ store, tip: value, time, reset, delay, request: { url, params, ...config }, formatTime, ...props }: Props<S>) => {
    mobile: (import("@yd/r-hooks/types/useVerify/types").Data<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
    }> & {
        dispatch: (action: import("@yd/r-hooks/types/useVerify/types").Action<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
        }>) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
        }>>;
        reset: (keys?: "mobile" | "*" | "tip" | keyof S | ("mobile" | "tip" | keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
        }>>;
        validate: (keys?: "mobile" | "*" | "tip" | keyof S | ("mobile" | "tip" | keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
        }>>;
        getValues: import("@yd/r-hooks/types/useLatest/types").Handler<import("@yd/r-hooks/types/useVerify/types").Values<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
        }>>;
        getErrMsg: (key: "mobile" | "tip" | keyof S) => string;
    })["mobile"];
    tip: any;
} & Omit<{
    validate: (keys?: "mobile" | "*" | "tip" | keyof S | ("mobile" | "tip" | keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
    }>>;
} & Omit<import("@yd/r-hooks/types/useVerify/types").Data<S & {
    tip: {
        value: string;
    };
    mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
}> & {
    dispatch: (action: import("@yd/r-hooks/types/useVerify/types").Action<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
    }>) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
    }>>;
    reset: (keys?: "mobile" | "*" | "tip" | keyof S | ("mobile" | "tip" | keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
    }>>;
    validate: (keys?: "mobile" | "*" | "tip" | keyof S | ("mobile" | "tip" | keyof S)[]) => Promise<import("@yd/r-hooks/types/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
    }>>;
    getValues: import("@yd/r-hooks/types/useLatest/types").Handler<import("@yd/r-hooks/types/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/types/useVerify/types").StoreOpts;
    }>>;
    getErrMsg: (key: "mobile" | "tip" | keyof S) => string;
}, "validate"> & {
    onSubmit: import("../useForm/types").Handler;
    onUpdate: import("../useForm/types").Handler;
}, "mobile" | "tip"> & {
    getCaptcha: import("@yd/r-hooks/types/useLatest/types").Handler<Promise<Promise<void>>>;
    onAbort: () => Promise<void>;
};
export default _default;
