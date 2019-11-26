import { handleActions } from "redux-actions";
import { login, loginStart, logout } from "../actions";
import { Record } from "immutable";
import { createTransform } from "redux-persist";

export const UserRecord = Record({
	id: null,
	username: null,
	email: null,
	status: null,
	access_token: null,
}, 'UserRecord');

export const AuthStateRecord = Record({
	loggedIn: false,
	user: new UserRecord({}),
}, 'AuthStateRecord');

export const AuthStateTransform = createTransform(
	(inboundState) => {
			return { ...inboundState.toObject(), user: inboundState.user.toObject() };
	},
	(outboundState) => {
		return new AuthStateRecord({
			...outboundState,
			user: new UserRecord(outboundState.user),
		});
	},
	{ whitelist: ['auth'] }
);

export const authReducer = handleActions({
	[loginStart]: (state) => {
		return state
			.set("loggedIn", false);
	},
	[login]: (state, action) => {
		const user = action.payload;

		return state
			.set("loggedIn", true)
			.set("user", new UserRecord(user));
	},
	[logout]: (state) => {
		return state
			.set("loggedIn", false)
			.set("user", new UserRecord({}));
	},
}, new AuthStateRecord());
