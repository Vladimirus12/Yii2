import { Redirect, Route, Switch } from "react-router";
import { RoutesMainMenu } from "./routeConstants";
import { ProjectContainer } from "../components/projects";
import React from "react";
import { Login, Registration } from "../components/auth";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Profile } from "../components/auth/profile/Profile";
import { PrivateRoute } from "./access";
import { Projects } from "../components/projects/layout/Projects";
import { loggedInSelector } from "../selectors";

export const RouteSwitchComponent = (props) => {
	const { logout, loggedIn } = props;
	return (
		<Switch>
			<PrivateRoute exact path={ RoutesMainMenu.Home.path } component={ Projects }/>
			<PrivateRoute path={`${RoutesMainMenu.Projects.path}/:projectId` } component={ ProjectContainer }/>
			{/*<PrivateRoute path={ RoutesMainMenu.Tasks.path } component={ TasksContainer }/>*/}
			<PrivateRoute path={ RoutesMainMenu.Profile.path } component={ Profile }/>
			<Route path={ RoutesMainMenu.Logout.path } render={ () => {
				logout();
				return <Redirect to={ RoutesMainMenu.Login.path }/>;
			} }/>
			<Route path={ RoutesMainMenu.Registration.path } render={ () => {
				if (loggedIn) {
					return <Redirect to={ RoutesMainMenu.Home.path }/>;
				}
				return <Registration/>
			} }/>
			<Route path={ RoutesMainMenu.Login.path } render={ () => {
				if (loggedIn) {
					return <Redirect to={ RoutesMainMenu.Home.path }/>;
				}
				return <Login/>
			} }/>
		</Switch>
	)
};

const mapStateToProps = (state, props) => {
	return {
		loggedIn: loggedInSelector(state),
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		logout: () => dispatch(logout())
	}
};

export const RouteSwitch = connect(mapStateToProps, mapDispatchToProps)(RouteSwitchComponent);
