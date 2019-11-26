import "./ProjectsList.scss"
import React, { Fragment, useEffect } from "react";
import { connect } from 'react-redux';
import { Spin } from "antd";
import { loadProjects } from "../../../actions";
import { ProjectCard } from "../card";
import { projectsListSelector, projectsLoadingSelector } from "../../../selectors";

const ProjectsListComponent = ({ projects, loadProjects, loading }) => {

	useEffect(() => {
		loadProjects();
	}, [loadProjects]);

	const projectsEl = projects.map((project) => (
		<ProjectCard key={ project.id } project={ project }/>
	));

	return (
		<Fragment>
			{ loading && <Spin/> }
			<div className={ "project_list" }>
				{ projectsEl }
			</div>
		</Fragment>
	)
};

const mapStateToProps = (state, props) => {
	return {
		loading: projectsLoadingSelector(state),
		projects: projectsListSelector(state),
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		loadProjects: () => dispatch(loadProjects()),
	}
};

export const ProjectsList = connect(mapStateToProps, mapDispatchToProps)(ProjectsListComponent);
