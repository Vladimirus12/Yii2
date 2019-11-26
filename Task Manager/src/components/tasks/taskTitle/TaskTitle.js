import React, { useState } from "react";
import { Icon } from "antd";
import "./TaskTitle.scss";
import { TitleForm } from "../../titleForm";
import { archiveTask, saveTask } from "../../../actions";
import { connect } from "react-redux";
import { FromContainer } from "../../formContainer/FromContainer";
import { TaskForm } from "../taskForm/TaskForm";
import { TitleFormEditButtons } from "../../titleFormEditButtons";

const TaskTitleComponent = ({ task, saveTask, archiveTask }) => {
	const [isVisibleEditIcon, setVisibleEditIcon] = useState(false);
	const [isOpenForm, setOpenForm] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [styleEditTitle, setStyleEditTitle] = useState({ top: 0, left: 0, width: 0 });
	const titleField = React.createRef();
	const classes = {
		taskModal: "Task__modal",
		taskEdit: "Task__edit",
		taskTitle: "Task__title",
		taskName: "Task__name",
	};

	const toggleIcon = (visible, e) => {
		e.preventDefault();
		if (editMode) {
			return;
		}
		setVisibleEditIcon(visible);
	};

	const toggleEditTitle = (visible, e) => {
		e.preventDefault();

		const coordinate = titleField.current.getBoundingClientRect();
		setStyleEditTitle({
			wrapper: {
				top: coordinate.top - 10,
				left: coordinate.left - 10,
			},
			form: {
				width: coordinate.width + 20,
			},
		});

		setEditMode(visible);
		setVisibleEditIcon(false);
	};

	const handleSaveTask = (newTask) => {
		saveTask(task.merge({
			...newTask,
			deadline: newTask.deadline && newTask.deadline.format("YYYY-MM-DD HH:mm"),
		}));
	};

	const getContent = () => {
		if (isVisibleEditIcon) {
			return (
				<Icon
					type="edit"
					onClick={ (e) => toggleEditTitle(true, e) }
					className={ classes.taskEdit }
				/>
			);
		}

		if (editMode) {
			return (
				<>
					<div className={ classes.taskModal } onClick={ (e) => toggleEditTitle(false, e) }/>
					<FromContainer
						entity={ task }
						setEditMode={ setEditMode }
						saveEntity={ handleSaveTask }
						className={ "Task__modal__form" }
						styleForm={ styleEditTitle }
						type={ "task" }
					>
						<TitleForm>
							<TitleFormEditButtons
								archiveEntity={ archiveTask }
							/>
						</TitleForm>
					</FromContainer>
				</>
			);
		}
	};

	const toggleEditForm = (open, e) => {
		const classList = e.target.classList;

		const needOpen = !isOpenForm && (classList.contains(classes.taskTitle) || classList.contains(classes.taskName));
		const needClose = isOpenForm && classList.contains(classes.taskModal);
		if (!needOpen && !needClose) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();
		setOpenForm(open);
	};


	const getForm = () => {
		if (!isOpenForm) {
			return null;
		}

		return (
			<>
				<div className={ classes.taskModal } onClick={ (e) => toggleEditForm(false, e) }/>
				<FromContainer
					entity={ task }
					setEditMode={ setOpenForm }
					saveEntity={ handleSaveTask }
					archiveEntity={ archiveTask }
					className={ "Task__modal_edit-form" }
					type={ "task" }
				>
					<TaskForm/>
				</FromContainer>
			</>
		)
	};

	return (
		<div
			onMouseEnter={ (e) => toggleIcon(true, e) }
			onMouseLeave={ (e) => toggleIcon(false, e) }
			onClick={ (e) => toggleEditForm(true, e) }
			onContextMenu={ (e) => toggleEditTitle(true, e) }
			className={ `task__card ${classes.taskTitle}` }
			ref={ titleField }
		>
			{ <span className={ classes.taskName }>{ task.name }</span> }
			{ getContent() }
			{ getForm() }
		</div>
	)
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		saveTask: (data) => dispatch(saveTask(data)),
		archiveTask: (data) => dispatch(archiveTask(data)),
	}
};

export const TaskTitle = connect(null, mapDispatchToProps)(TaskTitleComponent);
