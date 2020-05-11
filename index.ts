import path from "path";
import async from "async";
import newman from "newman";
import { startTime, getProcessId, loadConfig, findApiWorkspace } from "./lib/utils";
import { doOnSingleProcess, doOnMultipleProcesses, isOnParallel } from "./lib/runner";

const PARALLEL_RUN_COUNT = 2;

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

startTime("all-used");
const run = () => {
	const processId = getProcessId();
	console.info((`Process[${processId}] started.`.bold as any).green);

	(async (): Promise<void> => {
		try {
			const env = await loadConfig();
			const workspace = await findApiWorkspace(env);
			if (isOnParallel(env)) {
				await doOnMultipleProcesses(workspace, env);
			} else {
				await doOnSingleProcess(workspace, env);
			}
		} catch (e) {
			console.error(e);
			return Promise.reject(e);
		}
	})()
		.then(() => {
			// console.log(`process[${processId}] exit on 0.`);
			process.exit(0);
		})
		.catch((reason: string) => {
			if (reason === "jammed") {
				// console.log(`process[${processId}] exit on 1024.`);
				process.exit(2);
			} else {
				// console.log(`process[${processId}] exit on 1.`);
				process.exit(1);
			}
		});
};
