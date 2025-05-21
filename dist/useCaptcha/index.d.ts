import { Props, GetCaptcha } from './types';
import { Store } from '@yd/r-hooks/dist/useVerify/types';
declare const _default: <S extends Store>({ store, tip: value, time, reset, delay, requestUrl, formatTime, ...props }: Props<S>) => {
    mobile: (import("@yd/r-hooks/dist/useVerify/types").Data<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
    }> & {
        dispatch: (action: import("@yd/r-hooks/dist/useVerify/types").Action<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
        }>) => Promise<import("@yd/r-hooks/dist/useVerify/types").Values<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
        }>>;
        reset: (keys?: "*" | "tip" | "mobile" | keyof S | ("tip" | "mobile" | keyof S)[]) => Promise<import("@yd/r-hooks/dist/useVerify/types").Values<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
        }>>;
        validate: (keys?: "*" | "tip" | "mobile" | keyof S | ("tip" | "mobile" | keyof S)[]) => Promise<import("@yd/r-hooks/dist/useVerify/types").Values<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
        }>>;
        getValues: import("@yd/r-hooks/dist/useLatest/types").Handler<import("@yd/r-hooks/dist/useVerify/types").Values<S & {
            tip: {
                value: string;
            };
            mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
        }>>;
        getErrMsg: (key: "tip" | "mobile" | keyof S) => string;
    })["mobile"];
    tip: any;
} & Omit<{
    validate: (keys?: "*" | "tip" | "mobile" | keyof S | ("tip" | "mobile" | keyof S)[]) => Promise<import("@yd/r-hooks/dist/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
    }>>;
} & Omit<import("@yd/r-hooks/dist/useVerify/types").Data<S & {
    tip: {
        value: string;
    };
    mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
}> & {
    dispatch: (action: import("@yd/r-hooks/dist/useVerify/types").Action<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
    }>) => Promise<import("@yd/r-hooks/dist/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
    }>>;
    reset: (keys?: "*" | "tip" | "mobile" | keyof S | ("tip" | "mobile" | keyof S)[]) => Promise<import("@yd/r-hooks/dist/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
    }>>;
    validate: (keys?: "*" | "tip" | "mobile" | keyof S | ("tip" | "mobile" | keyof S)[]) => Promise<import("@yd/r-hooks/dist/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
    }>>;
    getValues: import("@yd/r-hooks/dist/useLatest/types").Handler<import("@yd/r-hooks/dist/useVerify/types").Values<S & {
        tip: {
            value: string;
        };
        mobile: import("@yd/r-hooks/dist/useVerify/types").StoreOpts;
    }>>;
    getErrMsg: (key: "tip" | "mobile" | keyof S) => string;
}, "validate"> & {
    onSubmit: import("../useForm/types").Handler;
    onUpdate: import("../useForm/types").Handler;
}, "tip" | "mobile"> & {
    getCaptcha: GetCaptcha;
    onAbort: () => Promise<void>;
};
export default _default;
