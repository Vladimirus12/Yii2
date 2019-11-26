import React from "react";
import { TaskCard } from "../taskCard";
import { Row } from "antd";

export const TasksList = ({tasks}) => {

	const taskList = tasks.map(task => task ? <TaskCard key={ task.id } task={ task }/> : null);
	return (
		<div>
			Tasks
			<Row gutter={ 16 }>
				{ taskList }
			</Row>
		</div>
	)
};
