import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import { connect } from "react-redux";
import { saveTask } from "../../../actions/tasks";

class _TaskAddForm extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		const {user, form, saveTask} = this.props;
		const data = form.getFieldsValue();
		data.creator_id = user.id;
		saveTask(data);
		form.resetFields();
	};

	render() {

		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
			layout: "inline",
		};

		return (
			<Form { ...formItemLayout } onSubmit={ this.handleSubmit }>
				<Form.Item label="Task name">
					{ getFieldDecorator('name', {
						rules: [
							{
								required: true,
								message: 'Please input task name',
							},
						],
					})(<Input placeholder="Please input task name"/>) }
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add task
					</Button>
				</Form.Item>

			</Form>
		)
	}
}

function mapStateToProps(state, props) {
	return {
		user: state.auth.user,
	}
}

function mapDispatchToProps(dispatch, props) {
	return {
		saveTask: (data) => {
			return dispatch(saveTask(data));
		},
	}
}

export const TaskAddForm = connect(mapStateToProps, mapDispatchToProps)(
	Form.create({name: "test_create"})(_TaskAddForm)
);
