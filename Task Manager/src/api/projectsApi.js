import { BaseApi } from "./baseApi";

export class ProjectsApi extends BaseApi {
	static url = "projects";

	static getAllUrl(condition) {
		return `${this.url}?filter={"creator_id":${condition}}`;
	};
}
