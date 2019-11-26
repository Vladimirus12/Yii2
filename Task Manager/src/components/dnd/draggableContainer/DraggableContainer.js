import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const DraggableContainer = (props) => {
	const { index, id, children } = props;

	return (
		<Draggable
			key={ id }
			draggableId={ id }
			index={ index }
		>
			{ (provided) => (
				<div
					ref={ provided.innerRef }
					{ ...provided.draggableProps }
					{ ...provided.dragHandleProps }
				>
					{ children }
				</div>
			) }
		</Draggable>
	)
};
