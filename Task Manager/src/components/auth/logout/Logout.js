import { logout } from "../../../actions/auth";
import { connect } from "react-redux";

const _Logout = () => {

};

function mapDispatchToProps(dispatch, props) {
	return {logout}
}

export const Logout = connect(null, mapDispatchToProps)(_Logout);
