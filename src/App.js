import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import { Switch, Route } from "react-router-dom";
import ProjectsPage from "./containers/ProjectsPage/ProjectsPage";
import FreelancersPage from "./containers/FreelancersPage/FreelancersPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import VacanciesPage from "./containers/VacanciesPage/VacanciesPage";
import Logout from "./containers/Logout/Logout";
import AddPublicationPage from "./containers/AddPublicationPage/AddPublicationPage";
import CandidatesPage from "./containers/CandidatesPage/CandidatesPage";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
class App extends Component {
	componentDidMount() {
		this.props.onAuthCheck();
	}
	redirectToProfile = () => {};

	render() {
		let routes = (
			<Switch>
				<Route path="/projects" component={ProjectsPage} />
				<Route path="/vacancies" component={VacanciesPage} />
				<Route path="/freelancers" component={FreelancersPage} />
				<Route path="/candidates" component={CandidatesPage} />
				<Route path="/" component={ProjectsPage} />
			</Switch>
		);
		if (this.props.isAuthorized) {
			routes = (
				<Switch>
					<Route path="/projects" component={ProjectsPage} />
					<Route path="/vacancies" component={VacanciesPage} />
					<Route path="/freelancers" component={FreelancersPage} />
					<Route path="/candidates" component={CandidatesPage} />
					<Route path="/profile" component={ProfilePage} />
					<Route path="/add" component={AddPublicationPage} />
					<Route path="/logout" component={Logout} />
					<Route path="/" component={ProjectsPage} />
				</Switch>
			);
		}
		return <Layout redirectToProfile={this.redirectToProfile}>{routes}</Layout>;
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
