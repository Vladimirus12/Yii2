import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { loadTasks } from "../actions/tasks";
import { TaskAddForm, TasksList } from "../components/tasks";


export class _TasksContainer extends Component {
	componentDidMount() {
		this.props.loadTasks();
	}

	render() {
		const {tasks, loading} = this.props;

		return (
			<Fragment>
				<TaskAddForm/>
				{ tasks.length > 0 && <TasksList tasks={ tasks }/> }
				{ loading && "Loading ..." }
			</Fragment>
		)
	}
}

function mapStateToProps(state, props) {
	return {
		tasks: state.tasks.entries,
		loading: state.tasks.loading,
	}
}

function mapDispatchToProps(dispatch, props) {
	return {
		loadTasks: () => {
			return dispatch(loadTasks());
		},
	}
}

export const TasksContainer = connect(mapStateToProps, mapDispatchToProps)(_TasksContainer);
