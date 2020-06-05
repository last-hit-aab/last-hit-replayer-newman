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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doOnMultipleProcesses = exports.doOnSingleProcess = exports.isOnParallel = void 0;
var newman_1 = __importDefault(require("newman"));
var utils_1 = require("./utils");
var jsonfile_1 = __importDefault(require("jsonfile"));
// import fs from "fs";
var result_1 = require("./result");
var path_1 = __importDefault(require("path"));
var async_1 = __importDefault(require("async"));
// require newman in your project
// call newman.run to pass `options` object and wait for callback
exports.isOnParallel = function (execute_env) {
    return false;
};
var checkWorkspace = function (workspace) {
    if (!workspace.stories || workspace.stories.length == 0) {
        console.error("workspace don't have story folder ".bold.red);
        return false;
    }
    else {
        return true;
    }
};
var runNewman = function (story, flow, execute_env, next) {
    var collection = jsonfile_1.default.readFileSync(path_1.default.join(flow.path));
    var processId = utils_1.getProcessId();
    var api_env = execute_env.envs[execute_env.execute_env];
    var env = jsonfile_1.default.readFileSync(path_1.default.join(api_env.path));
    newman_1.default
        .run({
        collection: collection,
        environment: env,
        reporters: ["json", "cli"],
        reporter: { json: { export: "./newman/" + processId + "_" + story.name + "_" + flow.collectionName + "_result.json" } },
    })
        .on("start", function (err, args) {
        // on start of run, log to console
        console.log("running a collection...");
    })
        .on("done", function (err, summary) {
        console.log("done");
        if (err || summary.error) {
            console.error("collection run encountered an error.");
        }
        else {
            console.log("collection run completed.");
            next(err, summary);
        }
    });
};
exports.doOnSingleProcess = function (workspace, execute_env) {
    if (checkWorkspace(workspace)) {
        workspace.stories.forEach(function (story) {
            console.log("start story " + story);
            async_1.default.eachSeries(story.flows, function (flow, next) {
                console.log("start flow  " + flow.collectionName);
                runNewman(story, flow, execute_env, next);
            }, result_1.collectResults);
        });
        // if (next) collectResults();
    }
};
exports.doOnMultipleProcesses = function (workspace, execute_env) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };

//# sourceMappingURL=runner.js.map
