import { ApiFlow } from "./api_flow";

export interface ApiStory {
	name: string;
	flows: ApiFlow[];
}
