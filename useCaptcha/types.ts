/** @format */

import { Props as CountDownProps } from '@yd/r-hooks/useCountDown/types';
import { Props as FormProps } from '../useForm/types';
import { StoreOpts } from '@yd/r-hooks/useVerify/types';

export interface Props<S> extends Partial<CountDownProps>, FormProps<Store<S>> {
    store: Store<S>;
    tip: string;
    requestUrl: string;
}
type Store<S> = S & { mobile: StoreOpts };
