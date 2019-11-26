import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { TaskStatus } from "../taskStatus";
import "./ProjectBoard.scss"
import { saveTask, saveTasksOrderInStatuses, saveStatus, saveStatuses } from "../../../actions";
import { DragDrop } from "../../../helpers";
import { ButtonAddNew } from "../../buttonAddNew";
import {
	statusesArrayActiveSelector,
	statusesMapActiveSelector,
	statusesOrderActiveSelector,
	tasksLoading,
} from "../../../selectors";

const ProjectBoardComponent = (props) => {
	const { statusesMap, statusesOrder, statuses, saveStatus, saveStatuses, saveTasksOrderInStatuses } = props;
	const fields = {
		tasks: "tasks",
		status: "status",
		taskIndex: "status_index",
		statusIndex: "project_index",
	};

	const onDragEnd = (result) => {
		const { source, destination } = result;

		if (!destination) {
			return;
		}
		const statusSource = statusesMap.get(source.droppableId);

		if (source.droppableId === "statuses") {
			const newStatuses = DragDrop.reorderImmutable(
				statusesMap,
				fields.statusIndex,
				source.index,
				destination.index
			);
			saveStatuses(newStatuses.changedRecords);
			return;
		}

		if (source.droppableId === destination.droppableId) {

			const newTasks = DragDrop.reorderImmutable(
				statusSource.tasks,
				fields.taskIndex,
				source.index,
				destination.index
			);
			const newStatusSource = statusSource.set(fields.tasks, newTasks.newMap);

			saveTasksOrderInStatuses([newStatusSource], newTasks.changedRecords);
			return;
		}

		const taskId = statusSource.tasks.keySeq().get(source.index);

		const taskChange = statusSource
			.getIn([fields.tasks, taskId])
			.set(fields.status, destination.droppableId)
			.set(fields.taskIndex, -1);

		const statusDestination = statusesMap
			.get(destination.droppableId);

		const resultLists = DragDrop.moveImmutable(
			statusSource.get(fields.tasks).set(taskChange.id, taskChange),
			statusDestination.tasks,
			fields.taskIndex,
			source,
			destination,
		);

		const newStatusSource = statusSource.set(fields.tasks, resultLists.source);
		const newStatusDestination = statusDestination.set(fields.tasks, resultLists.destination);

		saveTasksOrderInStatuses([newStatusSource, newStatusDestination], resultLists.changedRecords);
	};

	const getStatusesList = () => {
		return statuses.map(
			(statusRecord, index) => {
				const tasks = statusRecord.get(fields.tasks).filter((task) => !task.archive);
				return (
					<TaskStatus
						statusIndex={ index }
						key={ statusRecord.id }
						status={ statusRecord }
						tasks={ tasks.valueSeq().toArray() }
					/>
				)
			}
		);
	};

	const handleSaveStatus = (status) => {
		status.project_index = statusesOrder.length;
		saveStatus(status);
	};

	return (
		<DragDropContext
			onDragEnd={ onDragEnd }
		>
			<div className="board__wrapper">
				<Droppable droppableId="statuses" direction="horizontal" type="column">
					{ (provided) => (
						<div
							ref={ provided.innerRef }
							{ ...provided.droppableProps }
							className="board__wrapper"
						>
							{ getStatusesList() }
							{ provided.placeholder }
						</div>
					) }
				</Droppable>
				<ButtonAddNew saveEntity={ handleSaveStatus } type={ "status" }/>
			</div>
		</DragDropContext>
	)
};

function mapStateToProps(state, props) {
	return {
		statuses: statusesArrayActiveSelector(state),
		statusesMap: statusesMapActiveSelector(state),
		statusesOrder: statusesOrderActiveSelector(state),
		loading: tasksLoading(state),
	}
}

function mapDispatchToProps(dispatch, props) {
	return {
		saveTasksOrderInStatuses: (statuses, tasks) => dispatch(saveTasksOrderInStatuses(statuses, tasks)),
		saveTask: (task) => dispatch(saveTask(task)),
		saveStatus: (status) => dispatch(saveStatus(status)),
		saveStatuses: (statuses) => dispatch(saveStatuses(statuses)),
	}
}

export const ProjectBoard = connect(mapStateToProps, mapDispatchToProps)(ProjectBoardComponent);
