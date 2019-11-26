import React, { useState } from "react";
import { changePassword } from "../../actions";
import { connect } from "react-redux";
import { ChangePasswordView } from "./ChangePasswordView";
import { Form, Modal } from "antd";
import { userSelector } from "../../selectors";

const ChangePasswordContainer = ({ user, form, changePassword, isModalVisible, hideModal }) => {
	const { getFieldDecorator } = form;
	const [confirmDirty, setConfirmDirty] = useState(false);

	const compareToFirstPassword = (rule, value, callback) => {
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	const validateToNextPassword = (rule, value, callback) => {
		if (value && confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		form.validateFields((errs, values) => {
			if (!errs) {
				const values = form.getFieldsValue();
				changePassword({ ...user, password: values.password , currentPassword: values.currentPassword});
				form.resetFields();
				hideModal();
			}
		});
	};

	const handleConfirmBlur = e => {
		const { value } = e.target;
		setConfirmDirty(confirmDirty || !!value);
	};

	return (
		<Modal
			title="Change password"
			visible={isModalVisible}
			onOk={handleSubmit}
			onCancel={hideModal}
		>
		<ChangePasswordView
			compareToFirstPassword={compareToFirstPassword}
			validateToNextPassword={validateToNextPassword}
			handleSubmit={handleSubmit}
			handleConfirmBlur={handleConfirmBlur}
			getFieldDecorator={getFieldDecorator}
		/>
		</Modal>
	)
};

const mapStateToProps = (state, props) => {
	return {
		user: userSelector(state),
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		changePassword: (data, currentPassword) => dispatch(changePassword(data, currentPassword)),
	}
};

export const ChangePassword = connect(mapStateToProps, mapDispatchToProps)(
	Form.create({ name: 'password' })(ChangePasswordContainer)
);
