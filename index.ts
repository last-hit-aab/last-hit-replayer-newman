import path from "path";
import async from "async";
import { loadExecuteEnvironment, findApiWorkspace } from "./lib/config";
import { startTime, getProcessId } from "./lib/utils";
import { doOnSingleProcess, doOnMultipleProcesses, isOnParallel } from "./lib/runner";

const PARALLEL_RUN_COUNT = 2;

import newman from "newman";

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

startTime("all-used");
const run = async () => {
	const processId = getProcessId();
	console.info((`Process[${processId}] started.`.bold as any).green);

	// (async (): Promise<void> => {
	try {
		const env = await loadExecuteEnvironment();
		const workspace = await findApiWorkspace();
		if (isOnParallel(env)) {
			await doOnMultipleProcesses(workspace, env);
		} else {
			doOnSingleProcess(workspace, env);
		}
	} catch (e) {
		console.error(e);
		return Promise.reject(e);
	}
	// })()
	// .then(() => {
	// 	// console.log(`process[${processId}] exit on 0.`);
	// 	process.exit(0);
	// })
	// .catch((reason: string) => {
	// 	if (reason === "jammed") {
	// 		// console.log(`process[${processId}] exit on 1024.`);
	// 		process.exit(2);
	// 	} else {
	// 		// console.log(`process[${processId}] exit on 1.`);
	// 		process.exit(1);
	// 	}
	// });
};

// export { FlowFile };
export { doOnMultipleProcesses, doOnSingleProcess };
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

export default run;
