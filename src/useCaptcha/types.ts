/** @format */

import { Props as CountDownProps } from '@yd/r-hooks/types/useCountDown/types';
import { Props as FormProps } from '../useForm/types';
import { StoreOpts, Values } from '@yd/r-hooks/types/useVerify/types';
import { Config } from '../useGet/types';

export interface Props<S> extends Partial<CountDownProps>, FormProps<Store<S>> {
    store: Store<S>;
    tip: string;
    request: {
        url: string;
        params?: Record<string, any>;
        formatParams?(
            params: Values<S> & Record<string, any>
        ): Promise<Record<string, any>> | Record<string, any>;
    } & Partial<Omit<Config<any>, 'immediate' | 'toast'>>;
}
type Store<S> = S & { mobile: StoreOpts };
