/** @format */

import { useForm } from '../index';
import { useStore } from '@yd/r-hooks';
import { Props } from '../useForm/types';
import { Action, Store } from '@yd/r-hooks/useVerify/types';

export default <S extends Store>(props: Omit<Props<S>, 'back'>) => {
    const { dispatch: d, reset, ...form } = useForm(props);
    const { visible, dispatch } = useStore({ visible: false });
    const onShow = (params: Action<S>) => {
        dispatch({ visible: true });
        d(params);
    };
    const onClose = () => {
        dispatch({ visible: false });
        reset();
    };
    return {
        ...form,
        visible,
        onShow,
        onClose
    };
};
