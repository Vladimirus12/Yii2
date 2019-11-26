import { Card, Col } from "antd";
import React from "react";

export const TaskCard = (props) => {
	const {id, name} = props.task;

	return (
		<Col className="gutter-row" span={ 6 } style={{ marginBottom: 20}}>
			<Card
				className="gutter-box"
				key={ id }
				size="small"
				title={ name }
				>
			</Card>
		</Col>
	)
};
