import { handleActions } from 'redux-actions';
import { Record } from "immutable";
import { createTransform } from "redux-persist";

import { ArrayHelper } from "../helpers/ArrayHelper";
import {
	addProject,
	dataProjectsReceived,
	errorProjectsOccurred,
	loadProjectsStart,
	setCurrentProject,
	updateProject
} from "../actions";

const ProjectRecord = Record({
	id: null,
	name: null,
	creator_id: null,
	description: null,
	status: 1,
	team_id: 1,
	deadline: null,
	archive: 0,
});

export const ProjectStateRecord = Record({
	loading: false,
	error: false,
	projects: ArrayHelper.toMap([], ProjectRecord),
	currentProject: null,
});

export const ProjectStateTransform = createTransform(
	(inboundState) => {
		return {...inboundState.toObject(), projects: inboundState.projects.valueSeq().toArray()};
	},
	(outboundState) => {
		return new ProjectStateRecord({
			...outboundState,
			projects: ArrayHelper.toMap(outboundState.projects, ProjectRecord),
		});
	},
	{ whitelist: ['projects'] }
);

export const projectsReducer = handleActions({
	[loadProjectsStart]: (state) => {
		return state
			.set("loading", true)
			.set("error", false);
	},
	[dataProjectsReceived]: (state, action) => {
		const projects = action.payload;
		return state
			.set("projects", ArrayHelper.toMap(projects, ProjectRecord))
			.set("loading", false);
	},
	[errorProjectsOccurred]: (state) => {
		return state
			.set("loading", false)
			.set("error", true);
	},
	[setCurrentProject]: (state, action) => {
		const project = action.payload;
		return state
			.set("currentProject", project);
	},
	[addProject]: (state, action) => {
		const project = action.payload;
		return state
			.setIn(["projects", project.id], new ProjectRecord(project))
			.set("loading", false);
	},
	[updateProject]: (state, action) => {
		const project = action.payload;
		return state
			.setIn(["projects", project.id], project);
	},
}, new ProjectStateRecord());
