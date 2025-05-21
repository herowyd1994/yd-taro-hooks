"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var taro_1 = require("@tarojs/taro");
var taro_utils_1 = require("@yd/taro-utils");
var react_1 = require("react");
var index_1 = require("../index");
exports.default = (function (selector, fileType, quality) {
    if (fileType === void 0) { fileType = 'png'; }
    if (quality === void 0) { quality = 1; }
    var canvas = (0, react_1.useRef)();
    var ctx = (0, react_1.useRef)();
    var dpr = (0, taro_utils_1.getSystemInfo)().pixelRatio;
    var handler = function (key, skip) {
        var _a;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return (_a = ctx.current)[key].apply(_a, args.map(function (item, i) { return (skip.includes(i) ? item : item * dpr); }));
    };
    var roundRect = function (x, y, w, h, r, type, color) {
        r = w < 2 * r ? w / 2 : r;
        r = h < 2 * r ? h / 2 : r;
        ctx.current.beginPath();
        moveTo(x + r, y);
        arcTo(x + w, y, x + w, y + h, r);
        arcTo(x + w, y + h, x, y + h, r);
        arcTo(x, y + h, x, y, r);
        arcTo(x, y, x + w, y, r);
        ctx.current.closePath();
        ctx.current["".concat(type, "Style")] = color;
        ctx.current[type]();
    };
    var fontStyle = function (size, family, align, baseline, type, color) {
        ctx.current.font = "".concat(size * dpr, "px ").concat(family);
        ctx.current.textAlign = align;
        ctx.current.textBaseline = baseline;
        ctx.current["".concat(type, "Style")] = color;
    };
    var multLineText = function (text, x, y, w, size, type) {
        var _a;
        w = w * dpr;
        var str = (_a = text[0]) !== null && _a !== void 0 ? _a : '';
        for (var i = 1; i < text.length; i++) {
            var width = ctx.current.measureText("".concat(str).concat(text[i])).width;
            if (width > w) {
                handler("".concat(type, "Text"), [0], str, x, y);
                y += size + 5;
                str = '';
            }
            str += text[i];
        }
        handler("".concat(type, "Text"), [0], str, x, y);
        return y + size;
    };
    var draw = function (handler_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([handler_1], args_1, true), void 0, function (handler, clear, delay) {
            var hide, _a, width, height;
            if (clear === void 0) { clear = false; }
            if (delay === void 0) { delay = 250; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        hide = (0, taro_utils_1.loading)({ title: '生成中...', delay: delay });
                        _a = canvas.current, width = _a.width, height = _a.height;
                        clear && clearRect(0, 0, width, height);
                        return [4, handler({
                                shadowOffsetX: shadowOffsetX,
                                shadowOffsetY: shadowOffsetY,
                                createLinearGradient: createLinearGradient,
                                createRadialGradient: createRadialGradient,
                                lineWidth: lineWidth,
                                miterLimit: miterLimit,
                                clearRect: clearRect,
                                fillRect: fillRect,
                                strokeRect: strokeRect,
                                lineTo: lineTo,
                                moveTo: moveTo,
                                arcTo: arcTo,
                                bezierCurveTo: bezierCurveTo,
                                quadraticCurveTo: quadraticCurveTo,
                                arc: arc,
                                rect: rect,
                                fillText: fillText,
                                strokeText: strokeText,
                                drawImage: drawImage
                            })];
                    case 1:
                        _b.sent();
                        return [4, hide()];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    var shadowOffsetX = function (x) { return (ctx.current.shadowOffsetX = x * dpr); };
    var shadowOffsetY = function (y) { return (ctx.current.shadowOffsetY = y * dpr); };
    var createLinearGradient = function (x0, y0, x1, y1) { return handler('createLinearGradient', [], x0, y0, x1, y1); };
    var createRadialGradient = function (x0, y0, r0, x1, y1, r1) { return handler('createRadialGradient', [], x0, y0, r0, x1, y1, r1); };
    var lineWidth = function (w) { return (ctx.current.lineWidth = w * dpr); };
    var miterLimit = function (m) { return (ctx.current.miterLimit = m * dpr); };
    var clearRect = function (x, y, w, h) {
        return handler('clearRect', [], x, y, w, h);
    };
    var fillRect = function (x, y, w, h, r, color) {
        if (r === void 0) { r = 0; }
        if (color === void 0) { color = '#000000'; }
        return roundRect(x, y, w, h, r, 'fill', color);
    };
    var strokeRect = function (x, y, w, h, r, color) {
        if (r === void 0) { r = 0; }
        if (color === void 0) { color = '#000000'; }
        return roundRect(x, y, w, h, r, 'stroke', color);
    };
    var lineTo = function (x, y) { return handler('lineTo', [], x, y); };
    var moveTo = function (x, y) { return handler('moveTo', [], x, y); };
    var arcTo = function (x1, y1, x2, y2, radius) {
        return handler('arcTo', [], x1, y1, x2, y2, radius);
    };
    var bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) { return handler('bezierCurveTo', [], cp1x, cp1y, cp2x, cp2y, x, y); };
    var quadraticCurveTo = function (cpx, cpy, x, y) {
        return handler('quadraticCurveTo', [], cpx, cpy, x, y);
    };
    var arc = function (x, y, radius, startAngle, endAngle, counterclockwise) { return handler('arc', [3, 4, 5], x, y, radius, startAngle, endAngle, counterclockwise); };
    var rect = function (x, y, w, h) { return handler('rect', [], x, y, w, h); };
    var fillText = function (_a) {
        var text = _a.text, x = _a.x, y = _a.y, _b = _a.width, width = _b === void 0 ? canvas.current.width / dpr - x : _b, color = _a.color, size = _a.size, _c = _a.family, family = _c === void 0 ? 'Arial' : _c, _d = _a.align, align = _d === void 0 ? 'left' : _d, _e = _a.baseline, baseline = _e === void 0 ? 'top' : _e;
        fontStyle(size, family, align, baseline, 'fill', color);
        return multLineText(text, x, y, width, size, 'fill');
    };
    var strokeText = function (_a) {
        var text = _a.text, x = _a.x, y = _a.y, _b = _a.width, width = _b === void 0 ? canvas.current.width / dpr - x : _b, color = _a.color, size = _a.size, _c = _a.family, family = _c === void 0 ? 'Arial' : _c, _d = _a.align, align = _d === void 0 ? 'left' : _d, _e = _a.baseline, baseline = _e === void 0 ? 'top' : _e;
        fontStyle(size, family, align, baseline, 'stroke', color);
        return multLineText(text, x, y, width, size, 'stroke');
    };
    var drawImage = function (url, x, y, w, h, r) {
        if (r === void 0) { r = 0; }
        return new Promise(function (resolve) {
            var image = canvas.current.createImage();
            image.src = url;
            image.onload = function () {
                ctx.current.save();
                roundRect(x, y, w, h, r, 'stroke', 'transparent');
                ctx.current.clip();
                handler('drawImage', [0], image, x, y, w, h);
                ctx.current.restore();
                resolve();
            };
        });
    };
    var canvasToPhotosAlbum = function () { return __awaiter(void 0, void 0, void 0, function () {
        var tempFilePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, taro_1.canvasToTempFilePath)({
                        canvas: canvas.current,
                        fileType: fileType,
                        quality: quality
                    })];
                case 1:
                    tempFilePath = (_a.sent()).tempFilePath;
                    return [4, (0, taro_utils_1.saveImageToPhotosAlbum)(tempFilePath)];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    }); };
    var toDataURL = function () { return canvas.current.toDataURL("image/".concat(fileType), quality); };
    (0, index_1.useNextTick)(function () {
        return (0, taro_1.createSelectorQuery)()
            .select(selector)
            .fields({ node: true, size: true })
            .exec(function (_a) {
            var _b = _a[0], node = _b.node, width = _b.width, height = _b.height;
            canvas.current = node;
            ctx.current = node.getContext('2d');
            node.width = width * dpr;
            node.height = height * dpr;
        });
    });
    return {
        canvas: canvas,
        ctx: ctx,
        dpr: dpr,
        draw: draw,
        canvasToPhotosAlbum: canvasToPhotosAlbum,
        toDataURL: toDataURL
    };
});
