import { ApiWorkspace } from "./model/api_workspace";
import { ExecuteEnvironment } from "./model/execute_env";
import newman from "newman";
import { ApiStory } from "./model/api_story";
import { ApiFlow } from "./model/api_flow";
import { getProcessId } from "./utils";
import jsonfile from "jsonfile";
// import fs from "fs";
import { collectResults } from "./result";
import path from "path";
import async from "async";
import { ApiEnvironment } from "./model/api_env";

// require newman in your project

// call newman.run to pass `options` object and wait for callback

export const isOnParallel = (execute_env: ExecuteEnvironment): Boolean => {
	return false;
};

const checkWorkspace = (workspace: ApiWorkspace): Boolean => {
	if (!workspace.stories || workspace.stories.length == 0) {
		console.error(("workspace don't have story folder ".bold as any).red);
		return false;
	} else {
		return true;
	}
};

const runNewman = (story: ApiStory, flow: ApiFlow, execute_env: ExecuteEnvironment, next: any) => {
	const collection = jsonfile.readFileSync(path.join(flow.path));
	const processId = getProcessId();
	const api_env = execute_env.envs[execute_env.execute_env] as ApiEnvironment;

	const env = jsonfile.readFileSync(path.join(api_env.path));
	newman
		.run({
			collection: collection,
			environment: env,
			reporters: ["json", "cli", "html"],
			reporter: {
				json: { export: `./newman/${processId}_${story.name}_${flow.collectionName}_result.json` },
				html: { export: `./newman/html/${processId}/${story.name}_${flow.collectionName}.html` },
			},
		})
		.on("start", function (err, args) {
			// on start of run, log to console
			console.log("running a collection...");
		})
		.on("done", function (err, summary) {
			console.log("done");
			if (err || summary.error) {
				console.error("collection run encountered an error.");
			} else {
				console.log("collection run completed.");
				next(err, summary);
			}
		});
};

export const doOnSingleProcess = (workspace: ApiWorkspace, execute_env: ExecuteEnvironment) => {
	if (checkWorkspace(workspace)) {
		workspace.stories.forEach((story) => {
			console.log(`start story ${story}`);
			async.eachSeries(
				story.flows,
				(flow, next) => {
					console.log(`start flow  ${flow.collectionName}`);
					runNewman(story, flow, execute_env, next);
				},
				collectResults
			);
		});

		// if (next) collectResults();
	}
};

export const doOnMultipleProcesses = async (workspace: ApiWorkspace, execute_env: ExecuteEnvironment) => {};
