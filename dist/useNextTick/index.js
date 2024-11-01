import { nextTick } from '@tarojs/taro';
import { useMount } from '@yd/r-hooks';
export default (handler) => useMount(() => nextTick(handler));
