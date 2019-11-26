import { createAction } from 'redux-actions';
import { ProjectsApi } from "../api";

export const loadProjectsStart = createAction('[Projects] Load start');
export const dataProjectsReceived = createAction('[Projects] Data received');
export const errorProjectsOccurred = createAction('[Projects] Error occurred');
export const setCurrentProject = createAction('[Projects] select project');
export const addProject = createAction('[Projects] add');
export const updateProject = createAction('[Projects] change project');

export const loadProjects = () => (dispatch, getState) => {
	const state = getState();
	dispatch(loadProjectsStart());
	ProjectsApi.getAll(state.auth.user.id)
		.then(projects => {
			return dispatch(dataProjectsReceived(projects));
		})
		.catch(error => dispatch(errorProjectsOccurred(error)));
};

export const saveProject = (project) => (dispatch) => {
	if (!project.id) {
		ProjectsApi.add(project)
			.then(response => dispatch(addProject(response)))
			.catch(error => dispatch(errorProjectsOccurred(error)));

	} else {
		dispatch(updateProject(project));
		ProjectsApi.update(project)
			.then(response => {
			})
			.catch(error => dispatch(errorProjectsOccurred(error)));
	}
};



