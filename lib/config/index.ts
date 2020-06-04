import { ExecuteEnvironment } from "../model/execute_env";
import { ApiWorkspace } from "../model/api_workspace";
import { argv as args } from "yargs";
import { getProcessId } from "../utils";
import fs from "fs";
import { ApiStory } from "../model/api_story";
import { ApiFlow } from "../model/api_flow";
import { ApiEnvironment } from "../model/api_env";
// import jsonfile from "jsonfile";
// import path from "path";

export const assertWorkspace = async (): Promise<string> => {
	const processId = getProcessId();
	const workspace = args.workspace as string | null;
	if (!workspace) {
		// workspace must be appointed
		console.error(
			(`Process[${processId}] Please specify workspace folder via [--workspace=folder].`.bold as any).red
		);
		return Promise.reject();
	}
	return workspace;
};

export const assertAdminURL = async (): Promise<string> => {
	const processId = getProcessId();
	const amdin = args.adminUrl as string | null;
	if (!amdin) {
		// workspace must be appointed
		console.error((`Process[${processId}] Please specify amdinUrl --amdinUrl=url].`.bold as any).red);
		return Promise.reject();
	}
	return amdin;
};

const assertEnv = async (): Promise<string> => {
	const processId = getProcessId();
	const env = args.env as string | null;
	if (!env) {
		// workspace must be appointed
		console.error((`Process[${processId}] Please specify env --env=name].`.bold as any).red);
		return Promise.reject();
	}
	return env;
};

const findEnvConfig = async (workspace: string): Promise<ExecuteEnvironment> => {
	const env = await assertEnv();
	const execute_env = { envs: new Map<string, ApiEnvironment>(), execute_env: env } as ExecuteEnvironment;

	const adminUrl = args.adminUrl as string;
	if (adminUrl) {
		execute_env.adminUrl = adminUrl;
	}

	const workspaceId = args.workspaceId as number;
	if (workspaceId) {
		execute_env.workspaceId = workspaceId;
	}

	const testPlanId = args.testPlanId as number;
	if (workspaceId) {
		execute_env.testPlanId = testPlanId;
	}

	const envFilePaths = fs.readdirSync(workspace).filter((name) => name.endsWith(".postman_environment.json"));
	if (envFilePaths) {
		envFilePaths.forEach((path) => {
			const environmentName = path.replace(".postman_environment.json", "");
			const environment = { path: `${workspace}/${path}`, environmentName: environmentName } as ApiEnvironment;
			execute_env.envs[environmentName] = environment;
		});
	}
	return execute_env;
};

export const loadExecuteEnvironment = async (): Promise<ExecuteEnvironment> => {
	try {
		const workspace = await assertWorkspace();
		return findEnvConfig(workspace);
	} catch (e) {
		return Promise.reject(e);
	}
};

export const findApiWorkspace = async (): Promise<ApiWorkspace> => {
	try {
		const api_workspace = {} as ApiWorkspace;
		const workspace = await assertWorkspace();
		const dirNames = fs.readdirSync(workspace).filter((name) => {
			const path = `${workspace}/${name}`;
			return fs.statSync(path).isDirectory();
		});

		const api_stories = dirNames.map((dirName) => {
			const dir = `${workspace}/${dirName}`;
			const flowNames = fs.readdirSync(dir).filter((name) => name.endsWith(".postman_collection.json"));
			const api_flows = flowNames.map((flowName) => {
				return {
					path: `${dir}/${flowName}`,
					collectionName: flowName.replace(".postman_collection.json", ""),
				} as ApiFlow;
			});
			return { name: dirName, flows: api_flows } as ApiStory;
		});
		api_workspace.stories = api_stories;
		return api_workspace;
	} catch (e) {
		return Promise.reject(e);
	}
};
