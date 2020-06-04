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
Object.defineProperty(exports, "__esModule", { value: true });
exports.doOnSingleProcess = exports.doOnMultipleProcesses = void 0;
var config_1 = require("./lib/config");
var utils_1 = require("./lib/utils");
var runner_1 = require("./lib/runner");
Object.defineProperty(exports, "doOnSingleProcess", { enumerable: true, get: function () { return runner_1.doOnSingleProcess; } });
Object.defineProperty(exports, "doOnMultipleProcesses", { enumerable: true, get: function () { return runner_1.doOnMultipleProcesses; } });
var PARALLEL_RUN_COUNT = 2;
//TODO
// read parameter
/**
 * 1. last-hit admin url
 * 2  parllel run number
 * 3  workspace path
 *
 *
 */
// const parametersForTestRun = {
// 	collection: path.join(__dirname, "postman/postman_collection.json"), // your collection
// 	environment: path.join(__dirname, "postman/localhost.postman_environment.json"), //your env
// 	reporters: "cli",
// };
// const parallelCollectionRun = (done) => {
// 	newman.run(parametersForTestRun, done);
// };
// let commands = [];
// for (let index = 0; index < PARALLEL_RUN_COUNT; index++) {
// 	commands.push(parallelCollectionRun);
// }
// // Runs the Postman sample collection thrice, in parallel.
// async.parallel(commands, (err, results) => {
// 	err && console.error(err);
//
// 	results.forEach(function (result) {
// 		var failures = result.run.failures;
// 		console.info(
// 			failures.length ? JSON.stringify(failures.failures, null, 2) : `${result.collection.name} ran successfully.`
// 		);
// 	});
// });
// const collection = require("../last-hit-paradise/api_test/smk-story/last-hit-admin.postman_collection.json");
utils_1.startTime("all-used");
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var processId, env, workspace, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                processId = utils_1.getProcessId();
                console.info(("Process[" + processId + "] started.").bold.green);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, config_1.loadExecuteEnvironment()];
            case 2:
                env = _a.sent();
                return [4 /*yield*/, config_1.findApiWorkspace()];
            case 3:
                workspace = _a.sent();
                if (!runner_1.isOnParallel(env)) return [3 /*break*/, 5];
                return [4 /*yield*/, runner_1.doOnMultipleProcesses(workspace, env)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                runner_1.doOnSingleProcess(workspace, env);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_1 = _a.sent();
                console.error(e_1);
                return [2 /*return*/, Promise.reject(e_1)];
            case 8: return [2 /*return*/];
        }
    });
}); };
// const run = () => {
// 	newman
// 		.run(
// 			{
// 				collection: require("/Users/yifeng/Documents/last-hit-e/github/aab/last-hit-paradise/api_test/smk-story/last-hit-admin.postman_collection.json"),
// 				environment: require("/Users/yifeng/Documents/last-hit-e/github/aab/last-hit-paradise/api_test/last-hit-local.postman_environment.json"),
// 				reporters: "cli",
// 				// reporter: { json: { export: `./newman/${story.name}/${flow.collectionName}.json` } },
// 			},
// 			function (err) {
// 				if (err) {
// 					throw err;
// 				}
// 				console.log("collection run complete!");
// 			}
// 		)
// 		.on("start", function (err, args) {
// 			// on start of run, log to console
// 			console.log("running a collection...");
// 		})
// 		.on("done", function (err, summary) {
// 			console.log("done");
// 			if (err || summary.error) {
// 				console.error("collection run encountered an error.");
// 			} else {
// 				console.log("collection run completed.");
// 			}
// 		});
// };
exports.default = run;

//# sourceMappingURL=index.js.map
