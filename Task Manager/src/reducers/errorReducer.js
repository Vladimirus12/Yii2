import { handleActions } from "redux-actions";
import { clearErrors, handleError } from "../actions";
import { Record } from "immutable";

const StateRecord = Record({
	error: false,
	errorText: "",
});

export const errorReducer = handleActions({
	[handleError]: (state, action) => {
		const errorText = action.payload;
		return state
			.set("error", true)
			.set("errorText", errorText);
	},
	[clearErrors]: (state) => {
		return state
			.set("error", false)
			.set("errorText", "errorText");
	},
}, new StateRecord());
