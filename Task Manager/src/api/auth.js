import request from "../utils/request";

export class Auth {
	static url = "users";

	static sendData = (data) => {
		return request.post(Auth.url, data);
	};

	static sendProfile = (data) => {
		return request.patch(`${Auth.url}/${data.id}`, data);
	};
}
