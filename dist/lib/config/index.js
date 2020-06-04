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
exports.findApiWorkspace = exports.loadExecuteEnvironment = exports.assertAdminURL = exports.assertWorkspace = void 0;
var yargs_1 = require("yargs");
var utils_1 = require("../utils");
var fs_1 = __importDefault(require("fs"));
// import jsonfile from "jsonfile";
// import path from "path";
exports.assertWorkspace = function () { return __awaiter(void 0, void 0, void 0, function () {
    var processId, workspace;
    return __generator(this, function (_a) {
        processId = utils_1.getProcessId();
        workspace = yargs_1.argv.workspace;
        if (!workspace) {
            // workspace must be appointed
            console.error(("Process[" + processId + "] Please specify workspace folder via [--workspace=folder].").bold.red);
            return [2 /*return*/, Promise.reject()];
        }
        return [2 /*return*/, workspace];
    });
}); };
exports.assertAdminURL = function () { return __awaiter(void 0, void 0, void 0, function () {
    var processId, amdin;
    return __generator(this, function (_a) {
        processId = utils_1.getProcessId();
        amdin = yargs_1.argv.adminUrl;
        if (!amdin) {
            // workspace must be appointed
            console.error(("Process[" + processId + "] Please specify amdinUrl --amdinUrl=url].").bold.red);
            return [2 /*return*/, Promise.reject()];
        }
        return [2 /*return*/, amdin];
    });
}); };
var assertEnv = function () { return __awaiter(void 0, void 0, void 0, function () {
    var processId, env;
    return __generator(this, function (_a) {
        processId = utils_1.getProcessId();
        env = yargs_1.argv.env;
        if (!env) {
            // workspace must be appointed
            console.error(("Process[" + processId + "] Please specify env --env=name].").bold.red);
            return [2 /*return*/, Promise.reject()];
        }
        return [2 /*return*/, env];
    });
}); };
var findEnvConfig = function (workspace) { return __awaiter(void 0, void 0, void 0, function () {
    var env, execute_env, adminUrl, workspaceId, testPlanId, envFilePaths;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, assertEnv()];
            case 1:
                env = _a.sent();
                execute_env = { envs: new Map(), execute_env: env };
                adminUrl = yargs_1.argv.adminUrl;
                if (adminUrl) {
                    execute_env.adminUrl = adminUrl;
                }
                workspaceId = yargs_1.argv.workspaceId;
                if (workspaceId) {
                    execute_env.workspaceId = workspaceId;
                }
                testPlanId = yargs_1.argv.testPlanId;
                if (workspaceId) {
                    execute_env.testPlanId = testPlanId;
                }
                envFilePaths = fs_1.default.readdirSync(workspace).filter(function (name) { return name.endsWith(".postman_environment.json"); });
                if (envFilePaths) {
                    envFilePaths.forEach(function (path) {
                        var environmentName = path.replace(".postman_environment.json", "");
                        var environment = { path: workspace + "/" + path, environmentName: environmentName };
                        execute_env.envs[environmentName] = environment;
                    });
                }
                return [2 /*return*/, execute_env];
        }
    });
}); };
exports.loadExecuteEnvironment = function () { return __awaiter(void 0, void 0, void 0, function () {
    var workspace, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exports.assertWorkspace()];
            case 1:
                workspace = _a.sent();
                return [2 /*return*/, findEnvConfig(workspace)];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, Promise.reject(e_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findApiWorkspace = function () { return __awaiter(void 0, void 0, void 0, function () {
    var api_workspace, workspace_1, dirNames, api_stories, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                api_workspace = {};
                return [4 /*yield*/, exports.assertWorkspace()];
            case 1:
                workspace_1 = _a.sent();
                dirNames = fs_1.default.readdirSync(workspace_1).filter(function (name) {
                    var path = workspace_1 + "/" + name;
                    return fs_1.default.statSync(path).isDirectory();
                });
                api_stories = dirNames.map(function (dirName) {
                    var dir = workspace_1 + "/" + dirName;
                    var flowNames = fs_1.default.readdirSync(dir).filter(function (name) { return name.endsWith(".postman_collection.json"); });
                    var api_flows = flowNames.map(function (flowName) {
                        return {
                            path: dir + "/" + flowName,
                            collectionName: flowName.replace(".postman_collection.json", ""),
                        };
                    });
                    return { name: dirName, flows: api_flows };
                });
                api_workspace.stories = api_stories;
                return [2 /*return*/, api_workspace];
            case 2:
                e_2 = _a.sent();
                return [2 /*return*/, Promise.reject(e_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };

//# sourceMappingURL=index.js.map
