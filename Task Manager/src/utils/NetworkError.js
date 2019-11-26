export default class NetworkError extends Error {
	constructor(message) {
		super();

		this.message = message;
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = (new Error()).stack;
		}
	}
}
