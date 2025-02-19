/** @format */

import { Props as CountDownProps } from '@yd/r-hooks/types/useCountDown/types';
import { Props as FormProps, Config } from '../useForm/types';
import { StoreOpts } from '@yd/r-hooks/types/useVerify/types';

export interface Props<S> extends Partial<CountDownProps>, FormProps<Store<S>> {
    store: Store<S>;
    tip: string;
    requestUrl: string;
}
export type Handler = (params?: Record<string, any>, config?: Config) => Promise<Promise<void>>;
type Store<S> = S & { mobile: StoreOpts };
