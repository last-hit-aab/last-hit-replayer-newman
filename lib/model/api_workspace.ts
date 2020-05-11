import { ApiStory } from "./api_story";
import { ApiEnvironment } from "./api_env";

export interface ApiWorkspace {
	stories: ApiStory[];
	env: ApiEnvironment;
}
