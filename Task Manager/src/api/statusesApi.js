import { BaseApi } from "./baseApi";

export class StatusesApi extends BaseApi {
	static url = "statuses";

	static getAllUrl(condition) {
		return `${this.url}?expand=tasks&sort=project_index&filter={"project_id":${condition}}`;
	};
}
