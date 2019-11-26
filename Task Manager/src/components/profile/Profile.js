import React, { Component } from "react";
import { Descriptions } from "antd";
import { connect } from "react-redux";

class _Profile extends Component {
	render() {
		const {user} = this.props;
		return (
			<Descriptions title="User profile">
				<Descriptions.Item label="User name">{user.username}</Descriptions.Item>
				<Descriptions.Item label="Email">{user.email}</Descriptions.Item>
			</Descriptions>
		)
	}
}

function mapStateToProps(state, props) {
	return {
		loggedIn: state.auth.loggedIn,
		user: state.auth.user,
	}
}

export const Profile = connect(mapStateToProps)(_Profile);
