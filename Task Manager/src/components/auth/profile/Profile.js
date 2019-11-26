import React, { useState } from "react";
import { Button, Form, Icon, Input } from "antd";
import { connect } from "react-redux";
import "./Profile.css"
import { onSaveProfile } from "../../../actions";
import { ChangePassword } from "../../changePassword";
import { FormattedMessage, injectIntl } from "react-intl";
import { userSelector } from "../../../selectors";

const ProfileComponent = ({ user, form, onSaveProfile, intl }) => {
	const { getFieldDecorator } = form;
	const [isModalVisible, setModalVisible] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		form.validateFields((errs, values) => {
			if (!errs) {
				onSaveProfile(user.merge(form.getFieldsValue()))
			}
		});
	};

	const showChangePassword = (e) => {
		e.preventDefault();
		setModalVisible(true);
	};

	const hideChangePassword = (e) => {
		setModalVisible(false);
	};

	return (
		<Form hideRequiredMark onSubmit={ handleSubmit } className="profile-form">
			<h2><FormattedMessage id={ "Profile" }/></h2>
			<Form.Item label={intl.formatMessage({ id: "username" })}>
				{ getFieldDecorator('username', {
					initialValue: user.username,
					rules: [{ required: true, message: intl.formatMessage({ id: "message.username" }) }],
				})(
					<Input
						prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } }/> }
						placeholder={intl.formatMessage({ id: "username" })}
					/>,
				) }
			</Form.Item>
			<Form.Item label="E-mail">
				{ getFieldDecorator('email', {
					initialValue: user.email,
					rules: [{ required: true, message: intl.formatMessage({ id: "message.email" }) }],
				})(
					<Input
						prefix={ <Icon type="mail" style={ { color: 'rgba(0,0,0,.25)' } }/> }
						placeholder="E-mail"
					/>,
				) }
			</Form.Item>

			<a className="profile-form-change" href="/" onClick={showChangePassword}>
				<FormattedMessage id={ "change.password" }/>
			</a>
			<ChangePassword isModalVisible={isModalVisible} hideModal={hideChangePassword}/>

			<Button type="primary" htmlType="submit" className="profile-form-button">
				<FormattedMessage id={ "Save" }/>
			</Button>
		</Form>
	)
};

const mapStateToProps = (state, props) => {
	return {
		user: userSelector(state),
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		onSaveProfile: (data) => dispatch(onSaveProfile(data)),
	}
};

export const Profile = connect(mapStateToProps, mapDispatchToProps)(
	Form.create({ name: 'profile' })(injectIntl(ProfileComponent))
);
