/** @format */

import { nextTick } from '@tarojs/taro';
import { useMount } from '@yd/r-hooks';
import { Handler } from '@yd/r-hooks/dist/useAsyncEffect/types';

export default (handler: Handler) => useMount(() => nextTick(handler));
