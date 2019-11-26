import { createSelector } from "reselect";

export * from "./tasks";

export const userSelector = (state) => state.auth.user;
export const loggedInSelector = (state) => state.auth.loggedIn;

export const errorSelector = (state) => state.errors.error;
export const errorTextSelector = (state) => state.errors.errorText;

export const hasMessageSelector = (state) => state.message.hasMessage;
export const messageTypeSelector = (state) => state.message.messageType;
export const messageTextSelector = (state) => state.message.messageText;

export const projectsLoadingSelector = (state) => state.projects.loading;
export const projectCurrentSelector = (state) => state.projects.currentProject;
export const projectsMapSelector = (state) => state.projects.projects;
export const projectIdSelector = (_,props) => parseInt(props.match.params.projectId);

export const projectsListSelector = createSelector(
	projectsMapSelector,
	(projectsMap) =>projectsMap.valueSeq().toArray()
);

export const projectById = createSelector(
	projectsMapSelector,
	projectIdSelector,
	(projectsMap, projectId) => projectsMap.get(projectId)
);
