/** @format */

import { Props as FormProps } from '../useForm/types';

export interface Props<S> extends FormProps<S> {
    reset?: boolean;
}
