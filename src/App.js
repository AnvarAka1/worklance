import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import { Switch, Route } from "react-router-dom";
import ProjectsPage from "./containers/ProjectsPage/ProjectsPage";
import FreelancersPage from "./containers/FreelancersPage/FreelancersPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
class App extends Component {
	componentDidMount() {
		console.log("HIIIII");
		this.props.onAuthCheck();
	}
	render() {
		return (
			<Layout>
				<Switch>
					<Route path="/projects" component={ProjectsPage} />
					<Route path="/freelancers" component={FreelancersPage} />
					<Route path="/profile" component={ProfilePage} />
					<Route
						path="/"
						component={() => {
							return null;
						}}
					/>
				</Switch>
			</Layout>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token != null,
		role: state.auth.role,
		lang: state.lang.lang
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuthCheck: () => dispatch(actions.authCheckState()),
		onLangInit: () => dispatch(actions.langInit()),
		onLangChange: () => dispatch(actions.langChange())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
