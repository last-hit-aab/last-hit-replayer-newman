import { ApiWorkspace } from "./model/api_workspace";
import { ExecuteEnvironment } from "./model/execute_env";

export const isOnParallel = (execute_env: ExecuteEnvironment): Boolean => {
	return false;
};

export const doOnSingleProcess = async (workspace: ApiWorkspace, execute_env: ExecuteEnvironment) => {};

export const doOnMultipleProcesses = async (workspace: ApiWorkspace, execute_env: ExecuteEnvironment) => {};
