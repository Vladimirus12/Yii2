import request from "../utils/request";

export class TasksApi {
	static url = "tasks";

	static getAll = (user) => {

		return request.get(`${TasksApi.url}?filter={"creator_id":${user.id}}`, {
			responseType: 'json',
		});
	};

	static save = (data) => {
		return request.post(TasksApi.url, data);
	}
}
