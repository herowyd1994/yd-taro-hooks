"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taro_1 = require("@tarojs/taro");
var r_hooks_1 = require("@yd/r-hooks");
exports.default = (function (handler) { return (0, r_hooks_1.useMount)(function () { return (0, taro_1.nextTick)(handler); }); });
