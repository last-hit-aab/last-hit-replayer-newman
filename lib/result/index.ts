import jsonfile from "jsonfile";
import fs from "fs";
import path from "path";

import { assertWorkspace } from "../config";
import { getProcessId } from "../utils";
import { sentToServer } from "./sent";

export const collectResults = async () => {
	const workspace = await assertWorkspace();
	const processId = getProcessId();
	const dir = path.join("newman");
	const resultFiles = fs.readdirSync(dir).filter((name) => name.startsWith(processId));

	const results = resultFiles.map((result) => {
		return {
			fileName: result,
			storyName: getRunInfo(result).storyName,
			flowName: getRunInfo(result).flowName,
			json: jsonfile.readFileSync(path.join(dir + "/" + result)),
		};
	});

	sentToServer(results);

	// console.log(resultFiles);
};

const getRunInfo = (fileName: string): { storyName: string; flowName: string } => {
	const data = fileName.split("_");
	return { storyName: data[1], flowName: data[2] };
};
