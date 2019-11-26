import { createSelector } from "reselect";

export const statusesMapSelector = (state) => {
	const newStatuses = state.tasks.statuses.sort((a, b) => a.project_index - b.project_index);
	return newStatuses;
};
export const statusesMapActiveSelector = createSelector(
	statusesMapSelector,
	(statusesMap) => {
		const activeStatusesMap = statusesMap.filter((status) => !status.archive);
		return activeStatusesMap.map((status) => {
			return status.set("tasks", status.tasks.filter((task) => !task.archive));
		});
	},
);
export const statusIdSelector = (_, props) => parseInt(props.statusId);

export const tasksLoading = (state) => state.tasks.loading;
export const tasksMapSelector = (state) => state.tasks.tasks;
export const tasksMapActiveSelector = createSelector(
	tasksMapSelector,
	(tasksMap) => tasksMap.filter((task) => !task.archive),
);

export const statusesArrayActiveSelector = createSelector(
	statusesMapActiveSelector,
	(statusesMap) => statusesMap.valueSeq().toArray(),
);

export const statusesOrderActiveSelector = createSelector(
	statusesMapActiveSelector,
	(statusesMap) => statusesMap.keySeq().toArray()
);

export const statusById = createSelector(
	statusesMapSelector,
	statusIdSelector,
	(statusesMap, statusId) => statusesMap.get(statusId)
);

export const tasksArrayActiveSelector = createSelector(
	tasksMapActiveSelector,
	(tasksMap) => tasksMap.valueSeq().toArray(),
);
