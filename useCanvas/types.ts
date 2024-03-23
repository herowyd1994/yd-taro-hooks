/** @format */

export type Handler = (utils: Utils) => Promise<void> | void;
interface Utils {
    shadowOffsetX: SetValueDpr;
    shadowOffsetY: SetValueDpr;
    createLinearGradient: CanvasRenderingContext2D['createLinearGradient'];
    createRadialGradient: CanvasRenderingContext2D['createRadialGradient'];
    lineWidth: SetValueDpr;
    miterLimit: SetValueDpr;
    clearRect: CanvasRenderingContext2D['clearRect'];
    fillRect: Rect;
    strokeRect: Rect;
    lineTo: CanvasRenderingContext2D['lineTo'];
    moveTo: CanvasRenderingContext2D['moveTo'];
    arcTo: CanvasRenderingContext2D['arcTo'];
    bezierCurveTo: CanvasRenderingContext2D['bezierCurveTo'];
    quadraticCurveTo: CanvasRenderingContext2D['quadraticCurveTo'];
    arc: CanvasRenderingContext2D['arc'];
    rect: CanvasRenderingContext2D['rect'];
    fillText: Text;
    strokeText: Text;
    drawImage: DrawImage;
}
export type SetValueDpr = (value: number) => void;
export type Rect = (x: number, y: number, w: number, h: number, r?: number, color?: string) => void;
export type Text = (options: {
    text: string;
    x: number;
    y: number;
    width?: number;
    color: string;
    size: number;
    family?: string;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
}) => number;
export type DrawImage = (
    url: string,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
    r?: number
) => void;
