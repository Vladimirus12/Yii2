import React, { useContext } from "react";

import { IntlContext } from "../../intl/intl";
import { Button, Dropdown, Icon, Menu } from "antd";

export const LangDropdown = (props) => {
	const intl = useContext(IntlContext);
	const menu = <Menu onClick={ (e) => intl.changeLang(e.key) }>
		<Menu.Item key={ "en" } data-cy="LangDropdown">EN</Menu.Item>
		<Menu.Item key={ "ru" }>RU</Menu.Item>
	</Menu>;
	return (
		<Dropdown overlay={ menu }>
			<Button className="Header_btn">
				{ intl.intl.locale.toUpperCase() } <Icon type="down"/>
			</Button>
		</Dropdown>
	);
};
