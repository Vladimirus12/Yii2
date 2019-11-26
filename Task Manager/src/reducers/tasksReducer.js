import { handleActions } from 'redux-actions';

import {
	addStatus,
	addTask,
	dataReceived,
	dataStatusesReceived,
	errorOccurred,
	loadStart, updateStatus,
	updateStatuses,
	updateTask
} from "../actions";
import { ArrayHelper } from "../helpers/ArrayHelper";
import { Record } from "immutable";

const StatusRecord = Record({
	id: null,
	name: null,
	project_id: null,
	project_index: null,
	tasks: [],
});

const TaskRecord = Record({
	id: null,
	name: null,
	description: null,
	status: null,
	status_index: null,
	creator_id: null,
	responsible_id: null,
	project_id: null,
	deadline: null,
	archive: null,
});

const TaskState = Record({
	loading: false,
	error: false,
	tasks: ArrayHelper.toOrderMap([], TaskRecord),
	currentTask: {},
	statuses: ArrayHelper.toOrderMap([], StatusRecord),
});

export const taskReducer = handleActions({
	[loadStart]: (state) => {
		return state
			.set("loading", true)
			.set("error", false);
	},

	[dataStatusesReceived]: (state, action) => {
		const statuses = action.payload;
		statuses
		// .sort((a, b) => a.project_index - b.project_index)  //Sorting from API
			.map(status => {
				const sortTasks = status.tasks
					.sort((a, b) => a.status_index - b.status_index);
				status.tasks = ArrayHelper.toOrderMap(sortTasks, TaskRecord);
				return status;
			});

		return state
			.set("statuses", ArrayHelper.toOrderMap(statuses, StatusRecord));
	},

	[dataReceived]: (state, action) => {
		const tasks = action.payload;
		return state
			.set("tasks", ArrayHelper.toOrderMap(tasks, TaskRecord))
			.set("loading", false);
	},

	[errorOccurred]: (state) => {
		return state
			.set("loading", false)
			.set("error", true);
	},

	[addTask]: (state, action) => {
		const task = new TaskRecord(action.payload);
		return state
			.set("tasks", task)
			.setIn(["statuses", task.status, "tasks", task.id], task);
	},

	[addStatus]: (state, action) => {
		const status = new StatusRecord(action.payload)
			.set("tasks", ArrayHelper.toOrderMap([], TaskRecord));
		return state
			.setIn(["statuses", status.id], status);
	},

	[updateTask]: (state, action) => {
		const task = action.payload;
		return state
			.setIn(["tasks", task.id], task)
			.setIn(["statuses", task.status, "tasks", task.id], task);
	},

	[updateStatus]: (state, action) => {
		const status = action.payload;
		return state
			.setIn(["statuses", status.id], status);
	},

	[updateStatuses]: (state, action) => {
		const newStatuses = action.payload;
		return newStatuses.reduce(
			(state, status) => state.setIn(["statuses", status.id], status),
			state
		);
	},
}, new TaskState());
