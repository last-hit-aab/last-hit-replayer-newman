import { ExecuteEnvironment } from "../model/execute_env";
import { ApiWorkspace } from "../model/api_workspace";

/**
 * get process id
 */
export const getProcessId = (): string => `${process.pid}`;

const defaultName = "last-hit-newman";
let starts: { [key in string]: number } = {};
export const startTime = (name: string = defaultName) => {
	starts[name] = new Date().getTime();
};

export const loadConfig = async (): Promise<ExecuteEnvironment> => {
	return new Promise((resolve) => setTimeout(() => resolve(), 2000));
};

export const findApiWorkspace = async (execute_env: ExecuteEnvironment): Promise<ApiWorkspace> => {
	return new Promise((resolve) => setTimeout(() => resolve(), 2000));
};
