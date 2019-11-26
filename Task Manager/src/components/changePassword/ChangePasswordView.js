import React from "react";
import { Form, Input } from "antd";

export const ChangePasswordView = ({
																		 compareToFirstPassword,
																		 validateToNextPassword,
																		 handleSubmit,
																		 handleConfirmBlur,
																		 getFieldDecorator,
																	 }) => {

	return (
		<Form hideRequiredMark onSubmit={ handleSubmit } className="password-form">
			<Form.Item label="Current password">
				{ getFieldDecorator('currentPassword', {
					rules: [
						{
							required: true,
							message: 'Please input your current password!',
						},
						{
							validator: validateToNextPassword,
						},
					],
				})(<Input.Password/>) }
			</Form.Item>
			<Form.Item label="New password" hasFeedback>
				{ getFieldDecorator('password', {
					rules: [
						{
							required: true,
							message: 'Please input your new password!',
						},
						{
							validator: validateToNextPassword,
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
							validator: compareToFirstPassword,
						},
					],
				})(<Input.Password onBlur={ handleConfirmBlur }/>) }
			</Form.Item>
		</Form>
	);
};
