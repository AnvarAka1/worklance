import { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

export class Logout extends Component {
	componentDidMount() {
		this.props.onLogout();
		this.props.history.replace("/");
	}
	render() {
		return null;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout())
	};
};
export default connect(null, mapDispatchToProps)(Logout);
