"use strict";
// import { argv as args } from "yargs";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shorternUrl = exports.endTime = exports.startTime = exports.getProcessId = void 0;
/**
 * get process id
 */
exports.getProcessId = function () { return "" + process.pid; };
var defaultName = "last-hit-newman";
var starts = {};
exports.startTime = function (name) {
    if (name === void 0) { name = defaultName; }
    starts[name] = new Date().getTime();
};
exports.endTime = function (name) {
    if (name === void 0) { name = defaultName; }
    var now = new Date().getTime();
    var start = starts[name];
    if (start) {
        delete starts[name];
        return now - start;
    }
    else {
        return 0;
    }
};
exports.shorternUrl = function (url) {
    try {
        var parsed = new URL(url);
        parsed.search = "";
        parsed.hash = "";
        return parsed.href;
    }
    catch (_a) {
        // parse fail, not a valid url, return directly
        return url;
    }
};

//# sourceMappingURL=index.js.map
