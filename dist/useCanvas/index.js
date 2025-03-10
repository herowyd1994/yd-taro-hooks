import { canvasToTempFilePath, createSelectorQuery } from '@tarojs/taro';
import { getSystemInfo, saveImageToPhotosAlbum, loading } from '@yd/taro-utils';
import { useRef } from 'react';
import { useNextTick } from '../index';
export default (selector, fileType = 'png', quality = 1) => {
    const canvas = useRef();
    const ctx = useRef();
    const { pixelRatio: dpr } = getSystemInfo();
    const handler = (key, skip, ...args) => ctx.current[key](...args.map((item, i) => (skip.includes(i) ? item : item * dpr)));
    const roundRect = (x, y, w, h, r, type, color) => {
        r = w < 2 * r ? w / 2 : r;
        r = h < 2 * r ? h / 2 : r;
        ctx.current.beginPath();
        moveTo(x + r, y);
        arcTo(x + w, y, x + w, y + h, r);
        arcTo(x + w, y + h, x, y + h, r);
        arcTo(x, y + h, x, y, r);
        arcTo(x, y, x + w, y, r);
        ctx.current.closePath();
        ctx.current[`${type}Style`] = color;
        ctx.current[type]();
    };
    const fontStyle = (size, family, align, baseline, type, color) => {
        ctx.current.font = `${size * dpr}px ${family}`;
        ctx.current.textAlign = align;
        ctx.current.textBaseline = baseline;
        ctx.current[`${type}Style`] = color;
    };
    const multLineText = (text, x, y, w, size, type) => {
        w = w * dpr;
        let str = text[0] ?? '';
        for (let i = 1; i < text.length; i++) {
            const { width } = ctx.current.measureText(`${str}${text[i]}`);
            if (width > w) {
                handler(`${type}Text`, [0], str, x, y);
                y += size + 5;
                str = '';
            }
            str += text[i];
        }
        handler(`${type}Text`, [0], str, x, y);
        return y + size;
    };
    const draw = async (handler, clear = false, delay = 250) => {
        const hide = loading({ title: '生成中...', delay });
        const { width, height } = canvas.current;
        clear && clearRect(0, 0, width, height);
        await handler({
            shadowOffsetX,
            shadowOffsetY,
            createLinearGradient,
            createRadialGradient,
            lineWidth,
            miterLimit,
            clearRect,
            fillRect,
            strokeRect,
            lineTo,
            moveTo,
            arcTo,
            bezierCurveTo,
            quadraticCurveTo,
            arc,
            rect,
            fillText,
            strokeText,
            drawImage
        });
        await hide();
    };
    const shadowOffsetX = x => (ctx.current.shadowOffsetX = x * dpr);
    const shadowOffsetY = y => (ctx.current.shadowOffsetY = y * dpr);
    const createLinearGradient = (x0, y0, x1, y1) => handler('createLinearGradient', [], x0, y0, x1, y1);
    const createRadialGradient = (x0, y0, r0, x1, y1, r1) => handler('createRadialGradient', [], x0, y0, r0, x1, y1, r1);
    const lineWidth = w => (ctx.current.lineWidth = w * dpr);
    const miterLimit = m => (ctx.current.miterLimit = m * dpr);
    const clearRect = (x, y, w, h) => handler('clearRect', [], x, y, w, h);
    const fillRect = (x, y, w, h, r = 0, color = '#000000') => roundRect(x, y, w, h, r, 'fill', color);
    const strokeRect = (x, y, w, h, r = 0, color = '#000000') => roundRect(x, y, w, h, r, 'stroke', color);
    const lineTo = (x, y) => handler('lineTo', [], x, y);
    const moveTo = (x, y) => handler('moveTo', [], x, y);
    const arcTo = (x1, y1, x2, y2, radius) => handler('arcTo', [], x1, y1, x2, y2, radius);
    const bezierCurveTo = (cp1x, cp1y, cp2x, cp2y, x, y) => handler('bezierCurveTo', [], cp1x, cp1y, cp2x, cp2y, x, y);
    const quadraticCurveTo = (cpx, cpy, x, y) => handler('quadraticCurveTo', [], cpx, cpy, x, y);
    const arc = (x, y, radius, startAngle, endAngle, counterclockwise) => handler('arc', [3, 4, 5], x, y, radius, startAngle, endAngle, counterclockwise);
    const rect = (x, y, w, h) => handler('rect', [], x, y, w, h);
    const fillText = ({ text, x, y, width = canvas.current.width / dpr - x, color, size, family = 'Arial', align = 'left', baseline = 'top' }) => {
        fontStyle(size, family, align, baseline, 'fill', color);
        return multLineText(text, x, y, width, size, 'fill');
    };
    const strokeText = ({ text, x, y, width = canvas.current.width / dpr - x, color, size, family = 'Arial', align = 'left', baseline = 'top' }) => {
        fontStyle(size, family, align, baseline, 'stroke', color);
        return multLineText(text, x, y, width, size, 'stroke');
    };
    const drawImage = (url, x, y, w, h, r = 0) => new Promise(resolve => {
        const image = canvas.current.createImage();
        image.src = url;
        image.onload = () => {
            ctx.current.save();
            roundRect(x, y, w, h, r, 'stroke', 'transparent');
            ctx.current.clip();
            handler('drawImage', [0], image, x, y, w, h);
            ctx.current.restore();
            resolve();
        };
    });
    const canvasToPhotosAlbum = async () => {
        const { tempFilePath } = await canvasToTempFilePath({
            canvas: canvas.current,
            fileType,
            quality
        });
        await saveImageToPhotosAlbum(tempFilePath);
    };
    const toDataURL = () => canvas.current.toDataURL(`image/${fileType}`, quality);
    useNextTick(() => createSelectorQuery()
        .select(selector)
        .fields({ node: true, size: true })
        .exec(([{ node, width, height }]) => {
        canvas.current = node;
        ctx.current = node.getContext('2d');
        node.width = width * dpr;
        node.height = height * dpr;
    }));
    return {
        canvas,
        ctx,
        dpr,
        draw,
        canvasToPhotosAlbum,
        toDataURL
    };
};
