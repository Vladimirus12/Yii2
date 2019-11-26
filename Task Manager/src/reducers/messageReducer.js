import { handleActions } from "redux-actions";
import { clearMessage, handleMessage } from "../actions/message";
import { Record } from "immutable";

const StateRecord = Record({
	hasMessage: false,
	messageType: "",
	messageText: "",
});

export const messageReducer = handleActions({
	[handleMessage]: (state, action) => {
		const {messageType, messageText} = action.payload;
		return state
			.set("hasMessage", true)
			.set("messageType", messageType)
			.set("messageText", messageText);
	},
	[clearMessage]: (state) => {
		return state
			.set("hasMessage", false)
			.set("messageType", "")
			.set("messageText", "");
	},
}, new StateRecord());
