import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { loadTasks } from "../../../actions/tasks";
import { ProjectBoard } from "../../tasks";
import { Button, Empty, Spin } from "antd";
import { projectById, tasksLoading } from "../../../selectors";
import { FormattedMessage } from "react-intl";
import "./ProjectContainer.scss"
import { saveProject } from "../../../actions";
import { EditableTitle } from "../../editableTitle";

export const ProjectContainerComponent = ({ loading, currentProject, loadTasks, saveProject }) => {

	useEffect(() => {
		if (currentProject) {
			loadTasks(currentProject.id);
		}
	}, [currentProject, loadTasks]);

	const getProjectContent = () => {
		if (!currentProject) {
			return <Empty/>;
		}
		return (
			<>
				<div className={ "Project__title_wrapper" }>
					<EditableTitle
						record={currentProject}
						saveRecord={saveProject}
					/>
					<Button>
						<FormattedMessage id={ "archive" }/>
					</Button>
				</div>
				<ProjectBoard/>
			</>
		)
	};

	return (
		<div>
			{ getProjectContent() }
			{ loading && <Spin/> }
		</div>
	)
};

const mapStateToProps = (state, props) => {
	return {
		loading: tasksLoading(state),
		currentProject: projectById(state, props),
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		loadTasks: (projectId) => dispatch(loadTasks(projectId)),
		saveProject: (data) => dispatch(saveProject(data)),
	}
};

export const ProjectContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectContainerComponent);
