import React, { useState } from "react";
import { Input } from "antd";
import "./EditableTitle.scss"

export const EditableTitle = ({ record, saveRecord, provided }) => {
	const [editMode, setEditMode] = useState(false);
	let textInput = React.createRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		setEditMode(false);

		const inputEl = textInput.current.input;
		inputEl.blur();

		if (inputEl.value.length === 0) {
			return;
		}
		saveRecord(record.set("name", inputEl.value));
	};

	const toggleEditMode = (enable, e) => {
		e.preventDefault();
		setEditMode(enable);
		if (textInput.current) {
			textInput.current.input.focus();
		}
	};

	if (!editMode) {
		return (
			<div
				className={ "Editable__title Editable__title__form_item" }
				onClick={ (e) => toggleEditMode(true, e) }
			>
				{ record.name }
			</div>
		)
	}

	if (textInput.current) {
		textInput.current.focus();
	}

	return (
		<form onSubmit={ handleSubmit } className={ "Editable__title__form" }>
			<Input
				ref={ textInput }
				className={ "Editable__title Editable__title__form_item" }
				defaultValue={ record.name }
				onBlur={ (e) => toggleEditMode(false, e) }
			/>
		</form>
	)
};
