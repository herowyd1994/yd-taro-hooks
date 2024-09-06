/** @format */

import { useForm } from '../index';
import { useStore } from '@yd/r-hooks';
import { Props } from '../useForm/types';
import { Action, Store } from '@yd/r-hooks/useVerify/types';

export default <S extends Store>(props: Props<S>) => {
    const { dispatch: d, reset, onSubmit: submit, onUpdate: update, ...form } = useForm(props);
    const { visible, dispatch } = useStore({ visible: false });
    const onShow = async (params?: Action<S>) => {
        dispatch({ visible: true });
        params && d(params);
    };
    const onClose = () => {
        dispatch({ visible: false });
        reset();
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
        ...form,
        visible,
        onShow,
        onClose,
        onSubmit,
        onUpdate
    };
};
