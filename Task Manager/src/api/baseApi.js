import request from "../utils/request";

export class BaseApi {
	static url = "projects";

	static getAllUrl(condition) {
		return `${this.url}?filter={"project_id":${condition}}`;
	};

	static getAll(condition) {
		return request.get(this.getAllUrl(condition), {
			responseType: 'json',
		});
	};

	static add(data) {
		return request.post(this.url, data);
	};

	static update(data) {
		return request.patch(`${this.url}/${data.id}`, data);
	};
}
