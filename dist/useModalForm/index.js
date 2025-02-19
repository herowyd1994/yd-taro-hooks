import { useForm } from '../index';
import { useStore } from '@yd/r-hooks';
export default ({ reset: r = true, ...props }) => {
    const { dispatch, reset, onSubmit: submit, onUpdate: update, ...form } = useForm(props);
    const { visible, $dispatch } = useStore({ visible: false });
    const onShow = async (params) => {
        $dispatch({ visible: true });
        params && dispatch(params);
    };
    const onClose = () => {
        $dispatch({ visible: false });
        r && reset();
    };
    const onSubmit = async (params) => {
        await submit(params);
        onClose();
    };
    const onUpdate = async (params) => {
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
