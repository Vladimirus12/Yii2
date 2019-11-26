import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { notification } from "antd";
import { clearErrors, handleError } from "../../actions";
import { errorSelector, errorTextSelector } from "../../selectors";

class _ErrorBoundary extends Component {

	componentDidCatch(error, errorInfo) {
		this.props.handleError(errorInfo);
	}

	openNotificationWithIcon = (type, message) => {
		notification[type]({
			message,
			description: "",
		});
		this.props.clearErrors();
	};

	render() {
		const {error, errorText} = this.props;
		return (
			<Fragment>
				{ error && this.openNotificationWithIcon("error", errorText) }
				{ !error && this.props.children }
			</Fragment>
		)
	}
}

function mapStateToProps(state, props) {
	return {
		error: errorSelector(state),
		errorText: errorTextSelector(state),
	}
}

function mapDispatchToProps(dispatch, props) {
	return {
		clearErrors: () => dispatch(clearErrors()),
		handleError: (error) => dispatch(handleError(error)),
	}
}

export const ErrorBoundary = connect(mapStateToProps, mapDispatchToProps)(_ErrorBoundary);
