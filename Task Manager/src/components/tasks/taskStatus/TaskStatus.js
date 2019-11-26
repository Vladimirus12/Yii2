import React, { useEffect, useState } from "react";
import "./TaskStatus.scss";
import { Droppable } from "react-beautiful-dnd";
import { ButtonAddNew } from "../../buttonAddNew";
import { saveStatus, saveTask } from "../../../actions";
import { connect } from "react-redux";
import { EditableTitle } from "../../editableTitle";
import { DraggableContainer } from "../../dnd/draggableContainer";
import { TaskTitle } from "../taskTitle";

const TaskStatusComponent = ({ statusIndex, status, tasks, saveTask, saveStatus }) => {
	const [heightStatus, setHeightStatus] = useState();

	const statusWrapperStyle = {
		height: heightStatus,
	};

	const statusContentStyle = {
		maxHeight: heightStatus,
	};

	const updateDimensions = () => {
		setHeightStatus(`${ document.body.clientHeight - 110 }px`);
	};

	useEffect(() => {
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
	}, []);

	const taskList = tasks.map((task, index) => {
			return (
				<DraggableContainer
					key={ task.id }
					id={ task.id }
					index={ index }
				>
					<TaskTitle task={task}/>
				</DraggableContainer>
			)
		}
	);

	const handleSaveTask = (task) => {
		task.status = status.id;
		task.status_index = tasks.length;
		saveTask(task);
	};

	const getTitle = () => (
		<EditableTitle
			record={ status }
			saveRecord={ saveStatus }
		/>
	);

	return (
		<DraggableContainer
			id={ status.id }
			index={ status.project_index }
		>
			<div className="status__wrapper" style={ statusWrapperStyle }>
				<div className={ "status__content" } style={ statusContentStyle }>
					{ getTitle() }
					<Droppable droppableId={ status.id }>
						{ (provided) => (
							<>
								<div
									ref={ provided.innerRef }
									{ ...provided.droppableProps }
									className="status__tasks"
								>
									{ taskList }
									{ provided.placeholder }
								</div>
								<ButtonAddNew saveEntity={ handleSaveTask } type={ "task" }/>
							</>
						) }
					</Droppable>
				</div>
			</div>
		</DraggableContainer>

	)
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		saveTask: (data) => dispatch(saveTask(data)),
		saveStatus: (data) => dispatch(saveStatus(data)),
	}
};

export const TaskStatus = connect(null, mapDispatchToProps)(TaskStatusComponent);
