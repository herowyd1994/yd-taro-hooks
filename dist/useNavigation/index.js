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
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("@yd/taro-utils");
var taro_1 = require("@tarojs/taro");
var r_hooks_1 = require("@yd/r-hooks");
exports.default = (function (routeNames, defaultParams, delay) {
    if (delay === void 0) { delay = 500; }
    var _a = (0, taro_1.useRouter)(), path = _a.path, params = _a.params;
    var methods = ['push', 'replace', 'reLaunch', 'switchTab'].reduce(function (obj, method) {
        var _a;
        var done = (0, r_hooks_1.useLock)(function (key, params) {
            if (params === void 0) { params = {}; }
            return utils[method](routeNames[key], params);
        }, delay).done;
        return __assign(__assign({}, obj), (_a = {}, _a[method] = done, _a));
    }, {});
    var done = (0, r_hooks_1.useLock)(utils.back, delay).done;
    return __assign(__assign({ path: path, params: __assign(__assign({}, defaultParams), params) }, methods), { back: done });
});
