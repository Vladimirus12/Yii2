import "./ButtonAddNew.scss";
import { Icon } from "antd";
import { FormattedMessage } from "react-intl";
import React, { useState } from "react";
import { TitleForm } from "../titleForm";
import { FromContainer } from "../formContainer/FromContainer";

export const ButtonAddNew = (props) => {
	const {saveEntity, type} = props;
	const [addFormVisible, setAddFormVisible] = useState(false);

	const showAddTask = (e) => {
		e.preventDefault();
		setAddFormVisible(true);
	};

	if (addFormVisible) {
		return (
			<FromContainer
				setEditMode={ setAddFormVisible }
				entity={{}}
				saveEntity={saveEntity}
				type={type}
			>
				<TitleForm/>
			</FromContainer>
		)
	}

	return (
		<div className={ `add__button add__button_${type}` } onClick={ showAddTask }>
			<Icon type={ "plus" }/>&nbsp;<FormattedMessage id={ `add.${type}` }/>
		</div>
	)
};
