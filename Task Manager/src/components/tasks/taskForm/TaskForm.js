import { Button, DatePicker, Form, Input } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import React from "react";
import moment from "moment";

const { TextArea } = Input;

const TaskFormComponent = (props) => {
	const { entity, form, intl, styleForm, handleSubmit, handleCancel, className = "" } = props;
	const { getFieldDecorator } = form;

	return (
		<Form
			onSubmit={ (e) => handleSubmit(e, form) }
			className={ `Task__form ${ className }` }
			style={ styleForm }
		>
			<Form.Item
				label={ intl.formatMessage({ id: `task.name` }) }
				className={ "Task__form_item" }
			>
				{ getFieldDecorator('name', {
					initialValue: entity.name,
					rules: [
						{
							required: true,
							message: <FormattedMessage id={ `message.task.name` }/>,
						},
					],
				})(<Input
					placeholder={ intl.formatMessage({ id: `message.task.name` }) }
				/>) }
			</Form.Item>

			<Form.Item
				label={ intl.formatMessage({ id: `Description` }) }
				className={ "Task__form_item" }
			>
				{ getFieldDecorator('description', {
					initialValue: entity.description,
				})(<TextArea
					autosize={ { minRows: 3, maxRows: 10 } }
					placeholder={ intl.formatMessage({ id: `message.task.description` }) }
				/>) }
			</Form.Item>

			<Form.Item
				label={ intl.formatMessage({ id: `Deadline` }) }
				className={ "Task__form_item" }
				labelCol={ {span: 4} }
				wrapperCol={ {span: 14} }
			>
				{ getFieldDecorator('deadline', {
					initialValue: entity.deadline ? moment(entity.deadline, "YYYY-MM-DD HH:mm") : null,
				})(<DatePicker />) }
			</Form.Item>

			<div className={ "Task__form_button_wrapper" }>
				<Button type="primary" htmlType="submit" className={ "Task__form_button" }>
					<FormattedMessage id={ "Save" }/>
				</Button>

				<Button onClick={ handleCancel }>
					<FormattedMessage id={ "Cancel" }/>
				</Button>
			</div>
		</Form>
	)
};

export const TaskForm = Form.create({ name: 'task_form' })(injectIntl(TaskFormComponent));
