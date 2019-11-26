import { createAction } from 'redux-actions';
import { StatusesApi, TasksApi } from "../api";

export const loadStart = createAction('[Tasks] Load start');
export const dataReceived = createAction('[Tasks] Data received');
export const dataStatusesReceived = createAction('[Statuses] Data received');
export const errorOccurred = createAction('[Tasks] Error occurred');
export const addTask = createAction('[Tasks] add');
export const updateTask = createAction('[Tasks] change task');
export const addStatus = createAction('[Status] add');
export const updateStatus = createAction('[Status] change task');
export const updateStatuses = createAction('[Tasks] change statuses');

export const loadTasks = (projectId) => (dispatch) => {
	dispatch(loadStart());

	StatusesApi.getAll(projectId)
		.then(statuses => {
			dispatch(dataStatusesReceived(statuses));
			TasksApi.getAll(projectId)
				.then(tasks => {
					dispatch(dataReceived(tasks));
				})
				.catch(error => dispatch(errorOccurred(error)));
		})
		.catch(error => dispatch(errorOccurred(error)));

};

const save = (api, actionAdd, actionUpdate, entity) => (dispatch) => {
	if (!entity.id) {
		api.add(entity)
			.then(response => dispatch(actionAdd(response)))
			.catch(error => dispatch(errorOccurred(error)));
	} else {
		api.update(entity)
			.then(response => dispatch(actionUpdate(entity)))
			.catch(error => dispatch(errorOccurred(error)));
	}
};

export const saveTask = (task) => (dispatch) => {
	dispatch(save(TasksApi, addTask, updateTask, task));
};

export const saveStatus = (status) => (dispatch) => {
	dispatch(save(StatusesApi, addStatus, updateStatus, status));
};

export const saveStatuses = (statuses) => (dispatch) => {
	statuses.forEach((status) => {
		dispatch(saveStatus(status));
	});
};

export const saveTasksOrderInStatuses = (statuses, tasks) => (dispatch) => {
	tasks.forEach((task) => dispatch(saveTask(task)));
	dispatch(updateStatuses(statuses));
};

export const archiveTask = (task) => (dispatch) => {
	dispatch(save(TasksApi, addTask, updateTask, task.set("archive", 1)));
};
