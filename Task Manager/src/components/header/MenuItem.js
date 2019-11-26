import { Icon, Menu } from "antd";
import { Link } from "react-router-dom";
import React  from "react";
import { FormattedMessage } from "react-intl";

export const MenuItemCustom = (props) => {
	const { route, username, icon, ...otherProps } = props;
	return (
		<Menu.Item key={ route.path } { ...otherProps }>
			<Link to={ route.path }>
				{ icon && <Icon type={ icon }/> }
				{ username ? username : <FormattedMessage id={ route.title }/> }
			</Link>
		</Menu.Item>
	)
};
