import axios from 'axios';
import qs from 'querystring';

import RequestError from './RequestError';
import NetworkError from './NetworkError';

import { api } from '../config.json';

const request = axios.create({
	baseURL: api,
	paramsSerializer: params => qs.stringify(params),
});


request.interceptors.response.use((response) => {
	const result = response.data;
	if (result.error) {
		return Promise.reject(new RequestError(result.message, result.code));
	}
	return result;
}, (error) => {
	let message = error;
	if (error.response !== undefined) {
		if (error.response.data) {
			message = error.response.data.message;
		} else {
			message = error.response.statusText;
		}
	}
	return Promise.reject(new NetworkError(message));
});

export default request;
