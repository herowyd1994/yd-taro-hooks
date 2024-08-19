/** @format */

import { Props as CountDownProps } from '@yd/r-hooks/useCountDown/types';
import { Props as FormProps } from '../useForm/types';
import { StoreOpts } from '@yd/r-hooks/useVerify/types';

export interface Props<S> extends Partial<CountDownProps>, Omit<FormProps<Store<S>>, 'formatParams'> {
    store: Store<S>;
    tip: string;
    requestUrl: string;
    formatRequestParams?: FormProps<Store<S>>['formatParams'];
    formatSubmitParams?: FormProps<Store<S>>['formatParams'];
}
type Store<S> = S & { mobile: StoreOpts };
