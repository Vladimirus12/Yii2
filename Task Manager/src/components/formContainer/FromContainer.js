import React from "react";
import { connect } from "react-redux";
import "./FromContainer.scss";
import { projectCurrentSelector, userSelector } from "../../selectors";

const FromContainerComponent = (props) => {
	const { children, user, project, setEditMode, saveEntity } = props;

	const handleSubmit = (e, form) => {
		e.preventDefault();

		form.validateFields((errs, values) => {
			const formData = form.getFieldsValue();
			if (!errs) {
				saveEntity({
						creator_id: user.id,
						project_id: project.id,
						...formData,
					});
				setEditMode(false);
			}
		});
	};

	const handleCancel = (e) => {
		e.preventDefault();
		setEditMode(false);
	};

	const { entity, type, styleForm, className } = props;
	return (
		<>
			{
				React.Children.map(children, (child) => {
					return React.cloneElement(child, {
						entity,
						type,
						styleForm,
						className,
						handleSubmit: handleSubmit,
						handleCancel: handleCancel,
					})
				})
			}
		</>
	)
};

const mapStateToProps = (state, props) => {
	return {
		user: userSelector(state),
		project: projectCurrentSelector(state),
	}
};

export const FromContainer = connect(mapStateToProps)(FromContainerComponent);
