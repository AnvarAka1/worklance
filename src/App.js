import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import ProjectsPage from "./containers/ProjectsPage/ProjectsPage";
import FreelancersPage from "./containers/FreelancersPage/FreelancersPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import VacanciesPage from "./containers/VacanciesPage/VacanciesPage";
import Logout from "./containers/Logout/Logout";
import AddPublicationPage from "./containers/AddPublicationPage/AddPublicationPage";
import CandidatesPage from "./containers/CandidatesPage/CandidatesPage";
import ForgotPasswordPage from "./containers/ForgotPasswordPage/ForgotPasswordPage";
import { TitleComponent } from "./hoc/TitleComponent/TitleComponent";

import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
	state = {
		title: "Worklance"
	};
	componentDidMount() {
		if (localStorage.getItem("token")) {
			this.props.onAuthCheck();
			console.log("LOL");
		}
	}
	redirectToProfile = () => {};

	render() {
		let routes = (
			<Switch>
				<Route path="/projects" component={ProjectsPage} />
				<Route path="/vacancies" component={VacanciesPage} />
				<Route path="/freelancers" component={FreelancersPage} />
				<Route path="/candidates" component={CandidatesPage} />
				<Route path="/forgot" component={ForgotPasswordPage} />
				<Redirect from="*" to="/projects" />
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
					<Redirect from="*" to="/projects" />
				</Switch>
			);
		}
		return (
			<React.Fragment>
				<TitleComponent
					title={localStorage.getItem("name") ? localStorage.getItem("name") + " | Worklance" : null}
				/>
				<Layout redirectToProfile={this.redirectToProfile}>{routes}</Layout>
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token != null,
		role: state.auth.role,
		lang: state.lang.lang,
		name: state.auth.fullName
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
