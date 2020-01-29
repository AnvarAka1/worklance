import { Component } from "react";
import axios from "../../axios-db";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import queryString from "query-string";
export class SuccessPage extends Component {
	componentDidMount() {
		this.props.onSetLoading();
		const token = queryString.parse(this.props.location.search).token;
		axios
			.get(`/user/activation/${token}`)
			.then(res => {
				if (res.data.success) this.props.onAuthRegSuccess();
			})
			.catch(err => console.log(err));
	}
	render() {
		return null;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetLoading: () => dispatch(actions.authStart()),
		onAuthRegSuccess: () => dispatch(actions.authRegSuccess())
	};
};

export default connect(null, mapDispatchToProps)(SuccessPage);
