import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import "./Registration.css"
import { connect } from "react-redux";
import { onRegistration } from "../../../actions/auth";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class _Registration extends Component {
	propType = {
		onRegistration: PropTypes.func,
		history: PropTypes.func,
		form: PropTypes.obj
	};

	state = {
		confirmDirty: false,
	};

	handleSubmit = e => {
		const {form, onRegistration} = this.props;
		e.preventDefault();
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				onRegistration(form.getFieldsValue());
			}
		});
	};

	handleConfirmBlur = e => {
		const {value} = e.target;
		this.setState({confirmDirty: this.state.confirmDirty || !!value});
	};

	compareToFirstPassword = (rule, value, callback) => {
		const {form} = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const {form} = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], {force: true});
		}
		callback();
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 8},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 16},
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};

		return (
			<Form { ...formItemLayout } onSubmit={ this.handleSubmit } className="registration-form">
				<Form.Item label="E-mail">
					{ getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
							{
								required: true,
								message: 'Please input your E-mail!',
							},
						],
					})(<Input/>) }
				</Form.Item>
				<Form.Item label="Password" hasFeedback>
					{ getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Please input your password!',
							},
							{
								validator: this.validateToNextPassword,
							},
						],
					})(<Input.Password/>) }
				</Form.Item>
				<Form.Item label="Confirm Password" hasFeedback>
					{ getFieldDecorator('confirm', {
						rules: [
							{
								required: true,
								message: 'Please confirm your password!',
							},
							{
								validator: this.compareToFirstPassword,
							},
						],
					})(<Input.Password onBlur={ this.handleConfirmBlur }/>) }
				</Form.Item>
				<Form.Item { ...tailFormItemLayout }>
					<Button type="primary" htmlType="submit">
						Register
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

function mapDispatchToProps(dispatch, props) {
	return {
		onRegistration: (data) => dispatch(onRegistration(data))
	}
}

export const Registration = connect(null, mapDispatchToProps)(
	Form.create({name: 'register'})(withRouter(_Registration))
);
