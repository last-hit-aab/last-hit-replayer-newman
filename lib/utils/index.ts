// import { argv as args } from "yargs";

/**
 * get process id
 */
export const getProcessId = (): string => `${process.pid}`;

const defaultName = "last-hit-newman";
let starts: { [key in string]: number } = {};
export const startTime = (name: string = defaultName) => {
	starts[name] = new Date().getTime();
};

export const endTime = (name: string = defaultName) => {
	const now = new Date().getTime();
	const start = starts[name];
	if (start) {
		delete starts[name];
		return now - start;
	} else {
		return 0;
	}
};

export const shorternUrl = (url: string): string => {
	try {
		const parsed = new URL(url);
		parsed.search = "";
		parsed.hash = "";
		return parsed.href;
	} catch {
		// parse fail, not a valid url, return directly
		return url;
	}
};
