import React, { Component } from "react";
import { Button, Checkbox, Form, Icon, Input } from "antd";
import "./Login.css"
import { Link } from "react-router-dom";
import { RoutesMainMenu } from "../../../routing/routeConstants";
import { ReCaptcha } from "react-recaptcha-google";
import { connect } from "react-redux";
import { onLogin } from "../../../actions";
import { FormattedMessage, injectIntl } from "react-intl";
import { withRouter } from "react-router";

export class _Login extends Component {
	state = {
		captchaResponse: false,
	};

	componentDidMount() {
		if (this.captcha) {
			this.captcha.reset();
		}
	}

	onLoadRecaptcha = () => {
		if (this.captcha) {
			this.captcha.reset();
		}
	};

	verifyCallback = (recaptchaToken) => {
		if (recaptchaToken) {
			this.setState({ captchaResponse: true });
			this.props.form.validateFields(['captcha'], { force: true });
		}
	};

	handleSubmit = (e) => {
		const { captchaResponse } = this.state;
		const { form, onLogin } = this.props;

		e.preventDefault();

		form.validateFields((errs, values) => {
			if (!errs && captchaResponse) {
				onLogin(form.getFieldsValue());
			}
		});
	};

	render() {
		const { form: { getFieldDecorator }, intl } = this.props;
		const { captchaResponse } = this.state;
		return (
			<Form onSubmit={ this.handleSubmit } className="login-form">
				<h2><FormattedMessage id={ "Login" }/></h2>
				<Form.Item>
					{ getFieldDecorator('username', {
						rules: [{ required: true, message: intl.formatMessage({ id: "message.username_email" }) }],
					})(
						<Input
							prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } }/> }
							placeholder={ intl.formatMessage({ id: "username.email" }) }
						/>,
					) }
				</Form.Item>
				<Form.Item>
					{ getFieldDecorator('password', {
						rules: [{ required: true, message: intl.formatMessage({ id: "message.password" }) }],
					})(
						<Input
							prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } }/> }
							type="password"
							placeholder={ intl.formatMessage({ id: "Password" })}
						/>,
					) }
				</Form.Item>
				<Form.Item>
					{ getFieldDecorator('captcha', {
						rules: [{ required: !captchaResponse, message: intl.formatMessage({ id: "message.captcha" }) }],
					})(
						<ReCaptcha
							ref={ (el) => {
								this.captcha = el;
							} }
							size="normal"
							data-theme="dark"
							render="explicit"
							sitekey="6Lc5wbYUAAAAACMJCxVKavHFyPfyLbQer5LPmR2-"
							onloadCallback={ this.onLoadRecaptcha }
							verifyCallback={ this.verifyCallback }
						/>
					) }
				</Form.Item>
				<Form.Item>
					{ getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(<Checkbox>
						<FormattedMessage id={ "remember.me" }/>
					</Checkbox>) }
					{/*<Link className="login-form-forgot" to={ RoutesMainMenu.Login.path }>*/ }
					{/*	Forgot password*/ }
					{/*</Link>*/ }
					<Button type="primary" htmlType="submit" className="login-form-button">
						<FormattedMessage id={ "Log in" }/>
					</Button>
					<FormattedMessage id={ "Or" }/>
					<Link to={ RoutesMainMenu.Registration.path }>
						<FormattedMessage id={ "register.now" }/>
					</Link>
				</Form.Item>

			</Form>
		);
	}
}

function mapDispatchToProps(dispatch, props) {
	return {
		onLogin: (data) => dispatch(onLogin(data)),
	}
}

export const Login = connect(null, mapDispatchToProps)(
	Form.create({ name: 'login' })(withRouter(injectIntl(_Login)))
);
