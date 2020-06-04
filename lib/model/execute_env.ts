import { ApiEnvironment } from "./api_env";
import { ApiWorkspace } from "./api_workspace";

export interface ExecuteEnvironment {
	execute_env: string;
	envs: Map<string, ApiEnvironment>;
	adminUrl: string;
	workspaceId: number;
	workspaceName: string;
	testPlanName: string;
	testPlanId: number;
}
