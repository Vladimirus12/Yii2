import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { RoutesMainMenu } from "../routeConstants";
import { loggedInSelector } from "../../selectors";

const _PrivateRoute = ({component: Component, loggedIn, ...rest}) => {
	return (
		<Route
			{ ...rest }
			render={ (props) =>
				loggedIn ? (
					<Component { ...props } />
				) : (
					<Redirect
						to={ {
							pathname: RoutesMainMenu.Login.path,
							state: {from: props.location}
						} }
					/>
				)
			}
		/>
	)
};

function mapStateToProps(state, props) {
	return {
		loggedIn: loggedInSelector(state),
	}
}

export const PrivateRoute = connect(mapStateToProps)(_PrivateRoute);
