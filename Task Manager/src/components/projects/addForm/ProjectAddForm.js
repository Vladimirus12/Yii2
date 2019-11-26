import React from "react";
import { Button, Form, Input } from "antd";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { saveProject } from "../../../actions";
import { userSelector } from "../../../selectors";

const ProjectAddFormComponent = (props) => {
	const { user, form, saveProject } = props;

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = form.getFieldsValue();
		data.creator_id = user.id;
		data.status = 1;
		data.team_id = 1;
		saveProject(data);
		form.resetFields();
	};

	const { form: { getFieldDecorator }, intl } = props;
	const formItemLayout = {
		layout: "inline",
	};

	return (
		<Form { ...formItemLayout } onSubmit={ handleSubmit }>
			<Form.Item label={ intl.formatMessage({ id: "project.name" }) }>
				{ getFieldDecorator('name', {
					rules: [
						{
							required: true,
							message: intl.formatMessage({ id: "message.project.name" }),
						},
					],
				})(<Input placeholder={ intl.formatMessage({ id: "project.name" }) }/>) }
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					<FormattedMessage id={ "add.project" }/>
				</Button>
			</Form.Item>
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
		saveProject: (data) => {
			return dispatch(saveProject(data));
		},
	}
};

export const ProjectAddForm = connect(mapStateToProps, mapDispatchToProps)(
	Form.create({ name: "project_create" })(injectIntl(ProjectAddFormComponent))
);

