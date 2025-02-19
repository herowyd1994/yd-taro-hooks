/** @format */

import { useForm } from '../index';
import { useStore } from '@yd/r-hooks';
import { Props } from './types';
import { Action, Store } from '@yd/r-hooks/types/useVerify/types';

export default <S extends Store>({ reset: r = true, ...props }: Props<S>) => {
    const { dispatch, reset, onSubmit: submit, onUpdate: update, ...form } = useForm(props);
    const { visible, $dispatch } = useStore({ visible: false });
    const onShow = async (params?: Action<S>) => {
        $dispatch({ visible: true });
        params && dispatch(params);
    };
    const onClose = () => {
        $dispatch({ visible: false });
        r && reset();
    };
    const onSubmit = async (params?: Record<string, any>) => {
        await submit(params);
        onClose();
    };
    const onUpdate = async (params?: Record<string, any>) => {
        await update(params);
        onClose();
    };
    return {
        dispatch,
        reset,
        ...form,
        visible,
        onShow,
        onClose,
        onSubmit,
        onUpdate
    };
};
