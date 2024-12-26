/** @format */

import { Props as CountDownProps } from '@yd/r-hooks/types/useCountDown/types';
import { Props as FormProps } from '../useForm/types';
import { StoreOpts } from '@yd/r-hooks/types/useVerify/types';
import { MethodFnConfig } from '@yd/fetch/types/types';

export interface Props<S> extends Partial<CountDownProps>, FormProps<Store<S>> {
    store: Store<S>;
    tip: string;
    request: {
        url: string;
        params?: Record<string, any>;
    } & Omit<MethodFnConfig, 'toast'>;
}
type Store<S> = S & { mobile: StoreOpts };
