import { createAction } from "redux-actions";
import { Auth } from "../api/auth";
import { RoutesMainMenu } from "../routing";
import { handleError } from "./errors";
import { handleMessage } from "./message";
import { push } from "connected-react-router"

export const loginStart = createAction("[Auth] login start");
export const login = createAction("[Auth] login");
export const logout = createAction("[Auth] logout");

const send = (data) => async (dispatch) => {
	try {
		const response = (data.id !== undefined) ?
			await Auth.sendProfile(data) :
			await Auth.sendData(data);

		dispatch(login(response));
		(data.id !== undefined) ?
			dispatch(handleMessage({
				messageType: "success",
				messageText: "Profile updated"
			})) :
			dispatch(push(RoutesMainMenu.Home.path));
	} catch (error) {
		dispatch(handleError(error.message));
	}
};

export const onRegistration = (data) => (dispatch) => {
	data.username = data.email;
	dispatch(send(data));
};

export const onLogin = (data) => (dispatch) => {
	data.login = true;
	dispatch(send(data));
};

export const onSaveProfile = (data) => (dispatch) => {
	dispatch(send(data));
};

export const changePassword = (data) => (dispatch) => {
	dispatch(send(data));
};
