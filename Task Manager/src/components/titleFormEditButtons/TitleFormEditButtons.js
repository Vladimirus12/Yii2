import { Icon } from "antd";
import { FormattedMessage } from "react-intl";
import React from "react";

const TitleFormEditButtonsComponent = (props) => {
	const { entity, archiveEntity } = props;

	return (
			<div className={ "Title__buttons" }>
				<div className={ "Title__button" } onClick={ () => archiveEntity(entity) }>
					<Icon type={ "inbox" }/>
					<FormattedMessage id={ "in.archive" }/>
				</div>
			</div>
	)
};

export const TitleFormEditButtons = TitleFormEditButtonsComponent;
