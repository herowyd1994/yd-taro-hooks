import { Canvas } from '@tarojs/taro';
import { Handler } from './types';
declare const _default: (selector: string, fileType?: "jpg" | "png", quality?: number) => {
    canvas: import("react").MutableRefObject<Canvas>;
    ctx: import("react").MutableRefObject<CanvasRenderingContext2D>;
    dpr: number;
    draw: (handler: Handler, clear?: boolean, delay?: number) => Promise<void>;
    canvasToPhotosAlbum: () => Promise<void>;
    toDataURL: () => string;
};
export default _default;
