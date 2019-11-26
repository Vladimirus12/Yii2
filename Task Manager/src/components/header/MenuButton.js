import { Button, Icon } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export const MenuButton = ({ route, username, icon, ...otherProps }) => {
	return (
		<Button className="Header_btn">
			<Link to={ route.path }>
				{ icon && <span><Icon type={ icon }/> </span> }
				{ username ? username : <FormattedMessage id={ route.title } /> }
			</Link>
		</Button>
	);
};
