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
var taro_1 = require("@tarojs/taro");
exports.default = (function (config) {
    return new Promise(function (resolve, reject) {
        var method = config.method, header = config.headers, transformRequestUrl = config.transformRequestUrl, transformRequestBody = config.transformRequestBody;
        (0, taro_1.request)({
            url: transformRequestUrl(config),
            method: method,
            data: transformRequestBody(config),
            header: header,
            timeout: 60000,
            success: function (_a) {
                var data = _a.data, header = _a.header, status = _a.statusCode, errMsg = _a.errMsg, res = __rest(_a, ["data", "header", "statusCode", "errMsg"]);
                var code = data.code, msg = data.msg;
                data.code = code !== null && code !== void 0 ? code : status;
                resolve(__assign(__assign({}, res), { status: status, errMsg: msg !== null && msg !== void 0 ? msg : errMsg, headers: header, data: data, config: config }));
            },
            fail: function (_a) {
                var status = _a.statusCode, headers = _a.header, err = __rest(_a, ["statusCode", "header"]);
                return reject(__assign(__assign({}, err), { status: status, headers: headers, config: config }));
            }
        });
    });
});
