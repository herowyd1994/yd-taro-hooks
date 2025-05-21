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
    var store = _a.store, submitUrl = _a.submitUrl, updateUrl = _a.updateUrl, delay = _a.delay, _b = _a.toast, t = _b === void 0 ? true : _b, _c = _a.back, b = _c === void 0 ? false : _c, done = _a.done, props = __rest(_a, ["store", "submitUrl", "updateUrl", "delay", "toast", "back", "done"]);
    var fetch = (0, index_1.useFetch)();
    var back = (0, index_1.useNavigation)().back;
    var _d = (0, r_hooks_1.useVerify)(store), validate = _d.validate, verify = __rest(_d, ["validate"]);
    var d1 = (0, r_hooks_1.useLock)(function (params, config) { return handler('post', params, config); }, delay).done;
    var d2 = (0, r_hooks_1.useLock)(function (params, config) { return handler('put', params, config); }, delay).done;
    var handler = function (method, params, config) { return __awaiter(void 0, void 0, void 0, function () {
        var res, _a, _b, _c, _d, err_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 4, , 5]);
                    _b = (_a = fetch)[method];
                    _c = [method === 'post' ? submitUrl : updateUrl];
                    _d = [{}];
                    return [4, validate()];
                case 1: return [4, _b.apply(_a, _c.concat([__assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_e.sent())])), params]), __assign(__assign(__assign({}, props), config), { toast: false })]))];
                case 2:
                    res = _e.sent();
                    return [4, (done === null || done === void 0 ? void 0 : done(res))];
                case 3:
                    _e.sent();
                    t && (0, taro_utils_1.toast)("".concat(method === 'post' ? '提交' : '更新', "\u6210\u529F"));
                    b && back();
                    return [2, res];
                case 4:
                    err_1 = _e.sent();
                    (0, taro_utils_1.toast)(err_1.errMsg);
                    return [2, Promise.reject(err_1)];
                case 5: return [2];
            }
        });
    }); };
    return __assign(__assign({ validate: validate }, verify), { onSubmit: d1, onUpdate: d2 });
});
