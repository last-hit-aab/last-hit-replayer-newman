import { assertAdminURL } from "../config";
import { endTime } from "../utils";
import axios from "axios";
import { argv as args } from "yargs";

const buildBody = (results: string[]) => {
	const workspaceId = args.workspaceId as number;
	const testPlanId = args.testPlanId as number;
	if (workspaceId) {
		return {
			summary: results,
			workspace: {
				id: workspaceId,
			},
		};
	} else if (testPlanId) {
		return {
			// spent: used,
			summary: results,
			testPlan: {
				id: testPlanId,
			},
		};
	} else {
		return {
			// spent: used,
			summary: results,
			// testPlan: {
			// 	id: testPlanId,
			// },
		};
	}
};

export const sentToServer = async (results: string[]) => {
	const adminUrl = await assertAdminURL();
	if (adminUrl) {
		const used = endTime("all-used");
		// console.log("request body", JSON.stringify(buildBody(results)));
		try {
			const response = await axios.post(`${adminUrl}/openapi/api/test_run`, buildBody(results));

			console.log(response.status);
		} catch (e) {
			console.error("failed to push summary to admin server");
			console.error(e);
		}
	} else {
		console.info("failed to push summary to admin server");
	}
};
