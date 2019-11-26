import React from "react";
import { Layout } from "antd";
import "./Header.css";
import { RoutesMainMenu } from "../../routing/routeConstants";
import { connect } from "react-redux";
import { MenuButton } from "./MenuButton";
import { LangDropdown } from "./LangDropdown";
import { loggedInSelector, userSelector } from "../../selectors";

const _Header = ({ loggedIn, user }) => {

	return (
		<Layout.Header className="Header">

			<div className="Header__group">
					{ loggedIn && <MenuButton route={ RoutesMainMenu.Home } icon="home"/> }
			</div>

			<div style={ { flexGrow: 1 } }/>

			<div className="Header__group">
				<LangDropdown/>
				{ !loggedIn && <MenuButton route={ RoutesMainMenu.Login } icon="login"/> }
				{ loggedIn && <MenuButton route={ RoutesMainMenu.Profile } username={ user.username } icon="user"/> }
				{ loggedIn && <MenuButton route={ RoutesMainMenu.Logout } icon="logout"/> }
			</div>

		</Layout.Header>
	)
};

function mapStateToProps(state, props) {
	return {
		loggedIn: loggedInSelector(state),
		user: userSelector(state),
	}
}

export const Header = connect(mapStateToProps)(_Header);
