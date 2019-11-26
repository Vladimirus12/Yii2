import "./ProjectCard.scss";
import React from "react";
import { Link } from "react-router-dom";
import { RoutesMainMenu } from "../../../routing";
import { setCurrentProject } from "../../../actions";
import { connect } from "react-redux";

const ProjectCardComponent = ({ project, setCurrentProject }) => {

	const handleClick = (e) => {
		setCurrentProject(project);
	};

	return (
		<Link to={ `${RoutesMainMenu.Projects.path}/${project.id}` }>
			<div className={ "project__card" } onClick={handleClick}>
				{ project.name }
			</div>
		</Link>
	)
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		setCurrentProject: (project) => dispatch(setCurrentProject(project)),
	}
};

export const ProjectCard = connect(null, mapDispatchToProps)(ProjectCardComponent);
