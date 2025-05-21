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
var types_1 = require("./types");
exports.default = (function (_a) {
    var _b = _a.immediate, immediate = _b === void 0 ? true : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c, requestUrl = _a.requestUrl, params = _a.params, _d = _a.formatData, formatData = _d === void 0 ? function (data) { return data; } : _d, props = __rest(_a, ["immediate", "pageSize", "requestUrl", "params", "formatData"]);
    var get = (0, index_1.useFetch)().get;
    var _e = (0, r_hooks_1.useStore)({
        status: types_1.Status.None,
        noMore: false,
        pageNum: 1,
        data: []
    }), status = _e.status, noMore = _e.noMore, pageNum = _e.pageNum, data = _e.data, $dispatch = _e.$dispatch;
    var onRefresh = function () {
        return $dispatch({ status: types_1.Status.Refreshing, noMore: false, pageNum: 1, data: [] });
    };
    var onPull = function () { return !noMore && $dispatch({ status: types_1.Status.Pulling }); };
    var _f = (0, r_hooks_1.useLock)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, list, total, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, get(requestUrl, __assign(__assign({}, params), { pageSize: pageSize, pageNum: pageNum }), __assign(__assign({}, props), { formatData: function (list) { return (Array.isArray(list) ? { list: list, total: list.length } : list); } })).catch(function () { return ({ list: [], total: 0 }); })];
                case 1:
                    _a = _d.sent(), list = _a.list, total = _a.total;
                    _c = (_b = data).concat;
                    return [4, formatData(list)];
                case 2:
                    data = _c.apply(_b, [_d.sent()]);
                    return [2, $dispatch({
                            status: types_1.Status.None,
                            noMore: data.length >= total,
                            pageNum: pageNum + 1,
                            data: data
                        })];
            }
        });
    }); }), isLocking = _f.isLocking, done = _f.done;
    (0, r_hooks_1.useUpdate)(function () { return status !== types_1.Status.None && done(); }, [status]);
    (0, r_hooks_1.useMount)(function () { return immediate && onRefresh(); });
    return {
        status: status,
        noMore: noMore,
        data: data,
        isLocking: isLocking,
        onRefresh: onRefresh,
        onPull: onPull
    };
});
