"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var r_hooks_1 = require("@yd/r-hooks");
var index_1 = require("../index");
var taro_utils_1 = require("@yd/taro-utils");
exports.default = (function (_a) {
    var store = _a.store, value = _a.tip, _b = _a.time, time = _b === void 0 ? 60 : _b, _c = _a.reset, reset = _c === void 0 ? true : _c, delay = _a.delay, requestUrl = _a.requestUrl, _d = _a.formatTime, formatTime = _d === void 0 ? function (time) { return "".concat(time, "s"); } : _d, props = __rest(_a, ["store", "tip", "time", "reset", "delay", "requestUrl", "formatTime"]);
    var get = (0, index_1.useFetch)().get;
    var _e = (0, index_1.useForm)(__assign(__assign({}, props), { store: __assign(__assign({}, store), { tip: { value: value } }), delay: delay })), mobile = _e.mobile, tip = _e.tip, form = __rest(_e, ["mobile", "tip"]);
    var _f = (0, r_hooks_1.useCountDown)({
        time: time,
        reset: reset,
        delay: 0,
        formatTime: function (t) {
            t === time ? tip.reset() : tip.setValue(formatTime(t));
            return t;
        }
    }), countDown = _f.countDown, abort = _f.abort;
    var _g = (0, r_hooks_1.useLock)(function (params, config) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, err_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    _a = get;
                    _b = [requestUrl];
                    _c = [{}];
                    return [4, mobile.validate()];
                case 1: return [4, _a.apply(void 0, _b.concat([__assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_d.sent())])), params]), __assign(__assign({}, config), { toast: false })]))];
                case 2:
                    _d.sent();
                    (0, taro_utils_1.toast)('发送成功');
                    return [3, 4];
                case 3:
                    err_1 = _d.sent();
                    (0, taro_utils_1.toast)(err_1.errMsg);
                    return [2, Promise.reject(err_1)];
                case 4: return [2, countDown()];
            }
        });
    }); }, delay), done = _g.done, unLock = _g.unLock;
    var onAbort = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, unLock()];
                case 1:
                    _a.sent();
                    return [2, abort()];
            }
        });
    }); };
    return __assign(__assign({ mobile: mobile, tip: tip.value }, form), { getCaptcha: done, onAbort: onAbort });
});
