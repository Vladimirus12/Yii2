import { notification } from "antd";
import { clearMessage } from "../../actions/message";
import { connect } from "react-redux";
import React, { Component } from "react";
import { hasMessageSelector, messageTextSelector, messageTypeSelector } from "../../selectors";

export class _MessageNotification extends Component {

	message = null;

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { hasMessage, clearMessage, messageType, messageText } = this.props;
		if (hasMessage) {
			this.message = notification[messageType]({
				message: messageText,
				description: "",
			});
			clearMessage();
		}
		return prevProps;
	}

	render() {
		const { children } = this.props;
		return (
			<>
				{ this.message }
				{ children }
			</>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		hasMessage: hasMessageSelector(state),
		messageType: messageTypeSelector(state),
		messageText: messageTextSelector(state),
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		clearMessage: () => dispatch(clearMessage()),
	}
};

export const MessageNotification = connect(mapStateToProps, mapDispatchToProps)(_MessageNotification);

