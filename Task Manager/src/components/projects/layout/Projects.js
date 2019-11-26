import React from "react";
import { ProjectsList } from "../list";
import { ProjectAddForm } from "../addForm";

export const Projects = () => {
	return (
		<div>
			<ProjectAddForm />
			<ProjectsList />
		</div>
	)
};
