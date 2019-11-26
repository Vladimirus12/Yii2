export default class RequestError extends Error {
	constructor(message, code) {
		super();

		this.message = message;
		this.code = code;
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = (new Error()).stack;
		}
	}
}
