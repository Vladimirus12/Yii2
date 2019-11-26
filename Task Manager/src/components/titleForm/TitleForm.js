import { Button, Form, Input } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import React from "react";
import "./TitleForm.scss"

const { TextArea } = Input;

const TitleFormComponent = (props) => {
	const { entity, form, intl, handleSubmit, handleCancel, type, styleForm = {}, className = "" } = props;
	const { getFieldDecorator } = form;

	const getTextField = () => {
		if (type === "status") {
			return (
				<Input
					placeholder={ intl.formatMessage({ id: `message.${ type }.name` }) }
				/>
			)
		}

		return (
			<TextArea
				autosize={ { minRows: 2, maxRows: 6 } }
				placeholder={ intl.formatMessage({ id: `message.${ type }.name` }) }
			/>
		)
	};

	return (
		<div className={ `Title__wrapper ${ className }` } style={ styleForm.wrapper }>
			<Form
				onSubmit={ (e) => handleSubmit(e, form) }
				className={ `Title__form Title__form_${ type }` }
				style={ styleForm.form }
			>
				<Form.Item label={ false } className={ "Title__form_item" }>
					{ getFieldDecorator('name', {
						initialValue: entity.name,
						rules: [
							{
								required: true,
								message: <FormattedMessage id={ `message.${ type }.name` }/>,
							},
						],
					})(getTextField()) }
				</Form.Item>

				<div className={ "Title__form_button_wrapper" }>
					<Button type="primary" htmlType="submit" className={ "Title__form_button" }>
						<FormattedMessage id={ "Save" }/>
					</Button>

					<Button onClick={ handleCancel }>
						<FormattedMessage id={ "Cancel" }/>
					</Button>
				</div>
			</Form>
			{
				React.Children.map(props.children, (child) => {
					return React.cloneElement(child, {
						entity,
					})
				})
			}
		</div>
	)
};

export const TitleForm = Form.create({ name: 'title_form' })(injectIntl(TitleFormComponent));
