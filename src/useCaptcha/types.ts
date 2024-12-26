/** @format */

import { Props as CountDownProps } from '@yd/r-hooks/types/useCountDown/types';
import { Props as FormProps } from '../useForm/types';
import { StoreOpts } from '@yd/r-hooks/types/useVerify/types';
import { Config } from '../useCache/types';

export interface Props<S> extends Partial<CountDownProps>, FormProps<Store<S>> {
    store: Store<S>;
    tip: string;
    request: {
        url: string;
        params?: Record<string, any>;
    } & Partial<Omit<Config, 'immediate' | 'toast'>>;
}
type Store<S> = S & { mobile: StoreOpts };
